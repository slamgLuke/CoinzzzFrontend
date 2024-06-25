import { useState, useEffect } from "react";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { Dashboard } from "./Dashboard";
import { Portfolio } from "./Portfolio";
import { Settings } from "./Settings";
import { Auth } from "./Auth";
import "./App.css";
import { useUser } from "./UserContext";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

const router = (coinData, followList) =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route
					element={<MainLayout coinData={coinData} followList={followList} />}
				>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="dashboard/:activeTab" element={<Dashboard />} />
					<Route path="portfolio" element={<Portfolio />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="login" element={<Auth authType="login" />} />
				<Route path="register" element={<Auth authType="register" />} />
			</Route>,
		),
	);

function App() {
	const [coinData, setCoinData] = useState([]);
	const [followList, setFollowList] = useState([]);
	const { userId } = useUser();

	useEffect(() => {
		const fetchCoinData = async () => {
			// const data = await fetch("/TestCoinData.json").then((response) =>
			console.log(`${currencyApiIP}/currency`);
			const data = await fetch(`${currencyApiIP}/currency`).then((response) =>
				response.json(),
			);
			setCoinData(data);
		};

		const fetchFollowList = async () => {
			const data = await fetch(`${currencyApiIP}/track`, {
				method: "GET",
				headers: {
					Authorization: userId,
				},
			}).then((response) => response.json());
			setFollowList(data);
		};

		fetchCoinData();
		if (userId) fetchFollowList();
	}, []);

	return (
		<>
			<RouterProvider router={router(coinData, followList)} />
		</>
	);
}

export default App;
