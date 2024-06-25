import { useState, useEffect } from "react";
import DashboardTable from "./DashBoardTable";
import FollowingListTable from "./FollowingListTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./table.css";
import FollowCoinMenu from "./components/FollowCoinMenu";
// temporal
import { useUser } from "./UserContext";
import { useParams } from "react-router-dom";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

export function Dashboard() {
	const { activeTab } = useParams();
	const [activeTabState, setActiveTabState] = useState(activeTab || "monedas");

	const { userId, setUserId } = useUser();
	const [coinData, setCoinData] = useState([]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserId(event.target.value);
		console.log(userId);
	};

	useEffect(() => {
		const fetchData = async () => {
			// const data = await fetch("/TestCoinData.json").then((response) =>
			console.log(`${currencyApiIP}/currency`);
			const data = await fetch(`${currencyApiIP}/currency`).then((response) =>
				response.json(),
			);
			console.log(data);
			setCoinData(data);
		};

		fetchData();
		console.log("current user: ", userId);
	}, []);

	return (
		<div className="flex flex-col h-full">
			<Tabs
				defaultValue={activeTabState}
				onValueChange={setActiveTabState}
				className="pt-6 px-6"
			>
				<div className="flex flex-row items-center">
					<TabsList className="grid w-full grid-cols-2 w-[400px]">
						<TabsTrigger value="monedas">Monedas</TabsTrigger>
						<TabsTrigger value="seguimiento">Lista de seguimiento</TabsTrigger>
					</TabsList>
					<div className="pl-4">
						<input
							type="text"
							value={userId}
							onChange={handleInputChange}
							placeholder="Enter User ID"
						/>
					</div>
					{activeTabState === "seguimiento" && (
						<div className="ml-auto pr-4">
							<FollowCoinMenu coinData={coinData} userId={userId} />
						</div>
					)}
				</div>
				<TabsContent value="monedas" className="pt-8">
					<DashboardTable coinData={coinData} />
				</TabsContent>
				<TabsContent value="seguimiento" className="pt-8">
					<FollowingListTable coinData={coinData} userId={userId} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Dashboard;
