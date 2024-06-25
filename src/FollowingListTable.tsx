import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

export function FollowingListTable({ coinData, userId }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [trackingList, setTrackingList] = useState([]);

	useEffect(() => {
		// Función para realizar el fetch GET
		const fetchTrackingList = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`${currencyApiIP}/track`, {
					method: "GET",
					headers: {
						Authorization: userId,
					},
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setTrackingList(data); // Actualizar el estado con la lista de seguimiento obtenida
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		// Llamar a la función para obtener la lista de seguimiento cuando el componente se monte
		fetchTrackingList();
	}, [userId]); // Ejecutar useEffect cada vez que userId cambie

	const filteredTrackingList = coinData.filter((coin) => {
		// Verificar si el _id de la moneda está presente en la lista de seguimiento (trackingList)
		return trackingList.includes(coin._id);
	});

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead className="hidden sm:table-cell">MarketCap</TableHead>
					<TableHead className="text-center">Price</TableHead>
					<TableHead className="hidden sm:table-cell">Today</TableHead>
					<TableHead className="hidden sm:table-cell">7D</TableHead>
					<TableHead className="hidden sm:table-cell">30D</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{filteredTrackingList.map((coin, index) => (
					<TableRow key={index}>
						<TableCell>
							<div className="font-medium">{coin._id}</div>
						</TableCell>
						<TableCell className="hidden sm:table-cell">
							{coin.marketCap}
						</TableCell>
						<TableCell className="text-center">{coin.price}</TableCell>
						<TableCell className="hidden md:table-cell">{coin.today}</TableCell>
						<TableCell className="hidden md:table-cell">{coin.week}</TableCell>
						<TableCell className="hidden sm:table-cell">TEMP</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default FollowingListTable;
