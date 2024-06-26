import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserContext, { UserContextType } from "../UserContext";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

function isvalid(state) {
  // validate price
  if (state.price <= 0) {
    alert("Price must be greater than 0");
    return false;
  }
  // validate Quantity
  if (state.quantity <= 0) {
    alert("Quantity must be greater than 0");
    return false;
  }
  // validate Date
  if (state.date === "") {
    alert("Date must be selected");
    return false;
  } else if (state.date > new Date().toISOString().split("T")[0]) {
    alert("Date cannot be in the future");
    return false;
  }
  // validate balance
  if ((state.price * state.quantity) > state.portfolioNetworth && state.transactionType === "sell") {
    console.log(state.portfolioNetworth, state.price * state.quantity)
    alert("Insufficient balance to sell this quantity of coin");
    return false;
  }

  return true;
}

export default class PortfolioForm extends React.Component {
  static contextType = UserContext as React.Context<UserContextType>;

  constructor(props) {
    super(props);
    this.state = {
      coin: "BTC",
      transactionType: "buy",
      price: 1.0,
      quantity: 1,
      date: new Date().toISOString().split("T")[0],
      inputValue: "",
      coinData: props.coinData,
      portfolioNetworth: props.portfolioNetworth,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
  }

  handleSubmit(event) {
    const { userId } = this.context as UserContextType;
    event.preventDefault();
    if (!isvalid(this.state)) {
      return;
    }
    // post transaction
    const postPortfolio = async () => {
      try {
        const body = {
          transaction: {
            symbol: this.state.coin,
            type: this.state.transactionType,
            date: this.state.date,
            price: this.state.price,
            quantity: this.state.quantity,
            value: this.state.price * this.state.quantity,
          },
        };
        const response = await fetch(`${currencyApiIP}/portfolio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userId,
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        // console.log("Posted data:", data);
      } catch (error) {
        console.error("Failed to post portfolio data:", error);
      }
    };
    postPortfolio();
    window.location.reload();
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleTabsChange(value) {
    this.setState({
      transactionType: value,
    });
  }

  handleSearchChange(value) {
    this.setState({
      inputValue: value,
    });
  }

  handleSearchSelect(value) {
    this.setState({
      coin: value,
      inputValue: "",
    })
  }

  render() {

    const filteredCoinData = this.state.coinData.filter((coin) =>
      coin._id.toLowerCase().includes(this.state.inputValue.toLowerCase()),
    );

    console.log("portfolio networth: ", this.state.portfolioNetworth);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Plus strokeWidth={3} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs
            defaultValue={this.state.transactionType}
            onValueChange={this.handleTabsChange}
            className="pt-6 px-6"
          >
            <div className="flex flex-col items-center pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex flex-col items-center pb-2">
              <h2 className="text-center">
                {this.state.transactionType === "buy" ? "Buy" : "Sell"} Coin
              </h2>
              <Command className="rounded-lg border w-full">
                <CommandInput
                  placeholder="Type to search..."
                  onValueChange={this.handleSearchChange}
                  value={this.state.inputValue}
                />
                {
                  <CommandList>
                    {
                      this.state.inputValue.length > 0 &&
                      filteredCoinData.length > 0 &&
                      filteredCoinData.map((coin) => (
                        <CommandItem
                          key={coin._id}
                          value={coin._id}
                          onSelect={(value) => this.handleSearchSelect(value)}
                        >
                          {coin.name}
                        </CommandItem>
                      ))}
                  </CommandList>
                }
              </Command>
            </div>
            <form onSubmit={this.handleSubmit}>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Coin
                  </Label>
                  <Input
                    readOnly={true}
                    placeholder="0.00"
                    className="col-span-3 text-muted-foreground"
                    value={this.state.coin}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder="0.00"
                    className="col-span-3"
                    value={this.state.price}
                    onChange={this.handleChange}
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
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    className="col-span-3"
                    value={this.state.date}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Transaction</Button>
              </DialogFooter>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
}
