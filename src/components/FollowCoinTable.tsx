import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";

const currencyApiIP = import.meta.env.VITE_CURRENCY_API_IP || "localhost";

export function FollowCoinTable({ coinData, userId }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleCheckedChange = (_id) => {
		setLoading(true);
		setError(null);

		fetch(`${currencyApiIP}/track`, {
			method: "POST",
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

	return (
		<div className="overflow-y-auto	max-h-80">
			<Table className="">
				<TableBody>
					{coinData.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className="font-medium">{item.symbol}</div>
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{item.name}
							</TableCell>
							<TableCell>
								<Checkbox
									className="h-4 w-4"
									onCheckedChange={(_) => {
										handleCheckedChange(item._id);
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
