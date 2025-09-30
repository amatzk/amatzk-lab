import { createStore } from "solid-js/store";
import { DEFAULT_SETTINGS } from "./consts";
import type {
  AssetRecord,
  Participant,
  Participants,
  Settings,
  SettingsKey,
  StockMarketState,
  Transaction,
} from "./type";

type TradingPair = {
  seller: Participant;
  buyer: Participant;
};

type TransactionResult = {
  newParticipants: Participants;
  tx: Transaction;
  newPrice: number;
};

const initState = (s: Settings): StockMarketState => ({
  settings: s,
  participants: new Map(
    Array.from({ length: s.numOfParticipants }, (_, i) => [
      i,
      {
        id: i,
        cash: s.initialCapital,
        holdings: s.initialHoldings,
        totalAssets: s.initialCapital + s.initialHoldings * s.initialStockPrice,
      },
    ]),
  ),
  transactions: [],
  stockPriceHistory: [{ id: 0, price: s.initialStockPrice }],
  assetHistory: [
    {
      id: 0,
      marketCapitalization:
        s.initialHoldings * s.numOfParticipants * s.initialStockPrice,
      totalCash: s.initialCapital * s.numOfParticipants,
      totalAssets:
        s.initialCapital * s.numOfParticipants +
        s.initialHoldings * s.numOfParticipants * s.initialStockPrice,
    },
  ],
});

const selectRandom = <T>(items: T[]): T | undefined => {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
};

const selectTradingPair = (
  participants: Participants,
  price: number,
  quantity: number,
): TradingPair | null => {
  const totalCost = price * quantity;

  // 売り手選択(指定株数以上保有している参加者)
  const sellers = Array.from(participants.values()).filter(
    (p) => p.holdings >= quantity,
  );
  const seller = selectRandom(sellers);
  if (!seller) return null;

  // 買い手選択(トータルコストを支払える参加者∧売り手ではない)
  const buyers = Array.from(participants.values()).filter(
    (p) => p.cash >= totalCost && p.id !== seller.id,
  );
  const buyer = selectRandom(buyers);
  if (!buyer) return null;

  return { seller, buyer };
};

// 参加者の状態を更新（現金、保有株、総資産を一括計算）
const updateParticipant = (
  participant: Participant,
  cashChange: number,
  holdingsChange: number,
  currentPrice: number,
): Participant => {
  const updatedCash = participant.cash + cashChange;
  const updatedHoldings = participant.holdings + holdingsChange;

  return {
    ...participant,
    cash: updatedCash,
    holdings: updatedHoldings,
    totalAssets: updatedCash + updatedHoldings * currentPrice,
  };
};

const generateTransaction = (
  participants: Participants,
  nextTxId: number,
  lastPrice: number,
): TransactionResult | null => {
  // 取引数量は1株固定
  const quantity = 1;

  // 価格変動計算
  const priceChange = Math.random() < 0.5 ? -1 : 1;
  const newPrice = Math.max(1, lastPrice + priceChange);

  // 取引ペア選択
  const pair = selectTradingPair(participants, newPrice, quantity);
  if (!pair) return null;
  const { seller, buyer } = pair;

  // トランザクション作成
  const tx: Transaction = {
    id: nextTxId,
    participantBuyId: buyer.id,
    participantSellId: seller.id,
    quantity,
    price: newPrice,
  };

  // 参加者状態の更新
  const cost = tx.quantity * tx.price;
  const updatedBuyer = updateParticipant(buyer, -cost, tx.quantity, newPrice);
  const updatedSeller = updateParticipant(seller, cost, -tx.quantity, newPrice);

  const newParticipants = new Map(participants);
  newParticipants.set(updatedBuyer.id, updatedBuyer);
  newParticipants.set(updatedSeller.id, updatedSeller);

  return { newParticipants, tx, newPrice };
};

// 現金総額の計算 O(n)
const calcTotalCash = (participants: Participants): number =>
  Array.from(participants.values()).reduce((sum, p) => sum + p.cash, 0);

export const createSimulatorStore = () => {
  const [state, setState] = createStore<StockMarketState>(
    initState(DEFAULT_SETTINGS),
  );

  // ストアを初期化
  const resetStore = (): void => setState(initState(state.settings));

  // 設定値を更新
  const updateSetting = <K extends SettingsKey>(
    key: K,
    value: Settings[K],
  ): void => {
    setState("settings", key, value);
  };

  // 設定値を取得
  const getSettingValue = <K extends SettingsKey>(key: K): Settings[K] => {
    if (key in state.settings) {
      return state.settings[key];
    } else {
      throw new Error(`Key "${key}" does not exist in the store.`);
    }
  };

  // トランザクションを追加
  const addTransactions = (count: number): void => {
    setState((prev) => {
      let participants = new Map(prev.participants);
      let lastPrice =
        prev.stockPriceHistory[prev.stockPriceHistory.length - 1].price;
      let nextTxId = prev.transactions.length;

      const transactions: Transaction[] = [];
      const priceHistory: { id: number; price: number }[] = [];
      const assetHistory: AssetRecord[] = [];

      // 総発行株数（固定）
      const totalShares =
        prev.settings.initialHoldings * prev.settings.numOfParticipants;

      for (let i = 0; i < count; i++) {
        const result = generateTransaction(participants, nextTxId, lastPrice);
        if (!result) break;

        participants = result.newParticipants;
        transactions.push(result.tx);

        const priceRecord = {
          id: prev.stockPriceHistory.length + priceHistory.length,
          price: result.newPrice,
        };
        priceHistory.push(priceRecord);

        const totalCash = calcTotalCash(participants);
        const mcap = result.newPrice * totalShares;
        const assetRecord = {
          id: prev.assetHistory.length + assetHistory.length,
          marketCapitalization: mcap,
          totalCash: totalCash,
          totalAssets: mcap + totalCash,
        };
        assetHistory.push(assetRecord);

        lastPrice = result.newPrice;
        nextTxId++;
      }

      return {
        ...prev,
        participants,
        transactions: prev.transactions.concat(transactions),
        stockPriceHistory: prev.stockPriceHistory.concat(priceHistory),
        assetHistory: prev.assetHistory.concat(assetHistory),
      };
    });
  };

  return {
    state,
    updateSetting,
    getSettingValue,
    addTransactions,
    resetStore,
  };
};

export type SimulatorStore = ReturnType<typeof createSimulatorStore>;
