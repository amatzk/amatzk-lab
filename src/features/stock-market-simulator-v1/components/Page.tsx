import { AssetChart } from "./AssetChart";
import { ControlPanel } from "./ControlPanel";
import { ParticipantsTable } from "./ParticipantsTable";
import { Provider } from "./Provider";
import { StockPriceChart } from "./StockPriceChart";

const Page = () => {
  return (
    <div class="mx-auto w-full max-w-screen">
      <div class="flex flex-col gap-2 text-center mb-12">
        <h1 class="text-3xl font-bold">株式市場シミュレーター</h1>
        <p class="text-base font-medium">Stock Market Simulator</p>
      </div>
      <Provider>
        <StockPriceChart />
        <AssetChart />
        <ControlPanel />
        <ParticipantsTable />
      </Provider>
    </div>
  );
};

export { Page };
