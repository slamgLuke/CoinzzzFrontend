import { useState } from "react";
import DashboardTable from "./DashBoardTable";
import FollowingListTable from "./FollowingListTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./table.css";
import FollowCoinMenu from "./components/FollowCoinMenu";
// temporal
import { useUser } from "./UserContext";

export function Dashboard() {
	const [activeTab, setActiveTab] = useState("monedas"); // Estado para la pestaña activa

	const { userId, setUserId } = useUser();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserId(event.target.value);
		console.log(userId);
	};

	return (
		<div className="flex flex-col h-full">
			<Tabs
				defaultValue={activeTab}
				onValueChange={setActiveTab}
				className="pt-6 px-6"
			>
				<div className="flex flex-row items-center">
					<TabsList className="grid w-full grid-cols-2 w-[400px]">
						<TabsTrigger value="monedas">Monedas</TabsTrigger>
						<TabsTrigger value="seguimiento">Lista de seguimiento</TabsTrigger>
            <div className="py-4">
						<input
							type="text"
							value={userId}
							onChange={handleInputChange}
							placeholder="Enter User ID"
						/>
            </div>
					</TabsList>
					{activeTab === "seguimiento" && (
						<div className="ml-auto pr-4">
							<FollowCoinMenu />
						</div>
					)}
				</div>
				<TabsContent value="monedas" className="pt-8">
					<DashboardTable />
				</TabsContent>
				<TabsContent value="seguimiento" className="pt-8">
					<FollowingListTable />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Dashboard;
