import { SiteTitle } from "~/components/SiteTitle";
import { Page } from "~/features/stock-market-simulator-v1/components/Page";

const StockMarketSimulator = () => {
  return (
    <>
      <SiteTitle title="株式市場シミュレーター" />
      <Page />
    </>
  );
};

export default StockMarketSimulator;
