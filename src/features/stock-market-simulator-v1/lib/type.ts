export type Settings = {
  // 参加人数
  numOfParticipants: number;
  // 初期資金
  initialCapital: number;
  // 初期保有株数
  initialHoldings: number;
  // 初期株価
  initialStockPrice: number;
};
export type SettingsKey = keyof Settings;

export type Participant = {
  // 参加者ID
  id: number;
  // 現在の現金残高
  cash: number;
  // 現在の保有株数
  holdings: number;
  // 総資産
  totalAssets: number;
};

export type Participants = Map<number, Participant>;

export type StockPriceRecord = {
  // 取引ID
  id: number;
  // 現在の株価
  price: number;
};

export type Transaction = {
  // 取引ID
  id: number;
  // 売り側参加者ID
  participantBuyId: number;
  // 買い側参加者ID
  participantSellId: number;
  // 取引株数
  quantity: number;
  // 取引価格
  price: number;
};

export type AssetRecord = {
  // 資産履歴ID
  id: number;
  // 時価総額(株式市場の総額)
  marketCapitalization: number;
  // 現金総額
  totalCash: number;
  // 総資産額
  totalAssets: number;
};

export type StockMarketState = {
  settings: Settings;
  participants: Participants;
  transactions: Transaction[];
  stockPriceHistory: StockPriceRecord[];
  assetHistory: AssetRecord[];
};

export type NumberInputConfiguration<T extends SettingsKey = SettingsKey> = {
  readonly id: string;
  readonly label: string;
  readonly settingKey: T;
  readonly formatter: Intl.NumberFormatOptions;
  readonly min: number;
  readonly max: number;
  readonly step: number;
};

export type NumberInputSectionProps = {
  readonly title: string;
  readonly configs: ReadonlyArray<NumberInputConfiguration>;
};
