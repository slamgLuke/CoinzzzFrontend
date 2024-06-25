import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
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

	return true;
}

export default class PortfolioForm extends React.Component {
	static contextType = UserContext as React.Context<UserContextType>;

	constructor(props) {
		super(props);
		this.state = {
			coin: "BTC",
			transactionType: "buy",
			price: 0.0,
			quantity: 1,
			date: new Date().toISOString().split("T")[0],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTabsChange = this.handleTabsChange.bind(this);
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
			} finally {
        window.location.href = "/portfolio";
			}
		};
		postPortfolio();
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

	render() {
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
						</div>

						<form onSubmit={this.handleSubmit}>
							<DialogHeader className="flex flex-col items-center pl-24">
								<div className="relative w-full">
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										id="coin"
										placeholder="Search coins..."
										className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/3"
										value={this.state.coin}
										onChange={this.handleChange}
									/>
								</div>
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
