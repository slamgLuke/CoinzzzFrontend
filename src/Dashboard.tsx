import { useState } from "react";
import DashboardTable from "./DashBoardTable";
import FollowingListTable from "./FollowingListTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./table.css";
import FollowCoinMenu from "./components/FollowCoinMenu";

export function Dashboard() {
	const [activeTab, setActiveTab] = useState("monedas"); // Estado para la pestaña activa
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
					</TabsList>
					{activeTab === "seguimiento" && (
						<div className="ml-auto pr-4">
							<FollowCoinMenu />
						</div>
					)}
				</div>
				<TabsContent value="monedas">
					<DashboardTable />
				</TabsContent>
				<TabsContent value="seguimiento">
					<FollowingListTable />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Dashboard;
