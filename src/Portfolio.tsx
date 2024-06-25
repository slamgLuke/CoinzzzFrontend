import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TransactionTable from "./TransactionTable";
import plot from "./assets/plot.png";
import PortfolioForm from "./components/PortfolioForm.tsx";

import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

const apiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

export function Portfolio() {
	const { userId } = useUser();
	console.log("userId", userId);
	const [portfolio, setPortfolio] = useState<{
		networth?: number;
		transactions?: any[];
	}>({});
	const [networth, setNetworth] = useState<number | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log("fetching data");

		const fetchPortfolio = async () => {
			try {
				const response = await fetch(`${apiIP}/portfolio`, {
					method: "GET",
					headers: {
						// "Content-Type": "application/json",
						Authorization: userId,
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Fetched data:", data);
				setPortfolio(data);
			} catch (error) {
				setPortfolio({}); // No user found, set portfolio to null
				console.error("Failed to fetch portfolio data:", error);
			} finally {
				setLoading(false); // Stop loading after data is fetched
			}
		};

		fetchPortfolio();
	}, []);

	if (portfolio === undefined) {
		console.log("useEffect not working");
	}

	useEffect(() => {
		if (portfolio && portfolio.networth !== undefined) {
			setNetworth(portfolio.networth);
		} else {
			setNetworth(undefined);
		}
	}, [portfolio]);

	console.log(portfolio);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (userId === "") {
		return <div>Please login to view your portfolio</div>;
	}

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
						<CardTitle className="text-4xl">{networth}</CardTitle>
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
						<PortfolioForm />
					</div>
				</div>
				<TransactionTable transactions={portfolio.transactions || []} />
			</div>
		</div>
	);
}

export default Portfolio;
