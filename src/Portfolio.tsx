import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TransactionTable from "./TransactionTable";
import plot from "./assets/plot.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./table.css";
import { Plus, Search } from "lucide-react";

function InsertTransactionMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <form className="w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search coins..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/3"
              />
            </div>
          </form>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
            <InsertTransactionMenu />
          </div>
        </div>
        <TransactionTable />
      </div>
    </div>
  );
}

export default Portfolio;
