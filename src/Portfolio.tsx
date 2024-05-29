import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TransactionTable from "./TransactionTable";
import plot from "./assets/plot.png";
import PortfolioMenu from "./components/PortfolioMenu.tsx";

export function Portfolio() {
  return (
    <div>
      <div className="flex flex1 flex-col align-top">
        <h1 className="text-4xl font-semibold w-auto text-left py-4 pl-6">
          Portfolio
        </h1>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center pb-16">
          <Card className="items-center justify-center px-16 py-4">
            <CardDescription>Your Net</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
            <CardTitle className="text-2xl">0.13 BTC</CardTitle>
            <div className="text-xs text-muted-foreground">+25%</div>
            <img src={plot} alt="plot" className="hidden" />
          </Card>
        </div>
        <CardTitle>Transactions</CardTitle>
        <div className="text-xs text-muted-foreground pb-8">
          Your latest recorded transactions
        </div>
        <div className="flex flex-col item-center justify-start">
          <div className="w-24 ml-auto pr-4">
            <PortfolioMenu />
          </div>
        </div>
        <TransactionTable />
      </div>
    </div>
  );
}

export default Portfolio;
