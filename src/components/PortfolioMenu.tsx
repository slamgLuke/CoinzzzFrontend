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
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function FollowCoinMenu() {
  const [transactionType, setTransactionType] = useState("buy");
  const [coin, setCoin] = useState("BTC");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs
          defaultValue={transactionType}
          onValueChange={setTransactionType}
          className="pt-6 px-6"
        >
          <div className="flex flex-col items-center pb-4">
            <TabsList className="grid w-full grid-cols-2 w-[300px]">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-col items-center pb-2">
            <h2 className="text-center">{coin}</h2>
          </div>
            <DialogHeader className="flex flex-col items-center">
              <form className="w-full pl-24">
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
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                type="number"
                id="price"
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                type="number"
                id="quantity"
                placeholder="1"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input type="date" id="date" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Transaction</Button>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default FollowCoinMenu;
