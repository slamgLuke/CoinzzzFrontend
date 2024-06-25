import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

export function FollowCoinTable({ coinData, followList, userId }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [followListState, setFollowListState] = useState(followList);

	const handleCheckedChange = (_id, checked) => {
		setLoading(true);
		setError(null);

		console.log("chcked", checked);

		const method = checked ? "POST" : "DELETE";
		console.log("method", method);

		setFollowListState((prev) => {
			if (checked) {
				return [...prev, _id];
			} else {
				return prev.filter((id) => id !== _id);
			}
		});

		fetch(`${currencyApiIP}/track`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: userId, // Aquí se agrega userId como Authorization header
			},
			body: JSON.stringify({ currencyId: _id }), // Puedes enviar cualquier dato adicional necesario
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setLoading(false);
				console.log("Checked coin ID:", _id);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.message);
			});
	};

	console.log("followList", followList);

	return (
		<div className="overflow-y-auto	max-h-80">
			<Table className="">
				<TableBody>
					{coinData.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className="font-medium">{item._id}</div>
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{item.name}
							</TableCell>
							<TableCell>
								<Checkbox
									className="h-4 w-4"
									checked={followListState.includes(item._id)}
									onCheckedChange={(checked) => {
										handleCheckedChange(item._id, checked);
									}}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default FollowCoinTable;
