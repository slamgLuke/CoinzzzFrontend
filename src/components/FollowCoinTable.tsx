import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import data from "./ListedCoins.json";

export function FollowCoinTable() {
	const coins = data;
	const handleCheckedChange = (id) => {
		console.log("Checked coin ID:", id);
	};

	return (
		<div className="overflow-y-auto	max-h-80">
			<Table className="">
				<TableBody>
					{coins.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className="font-medium">{item.id}</div>
							</TableCell>
							<TableCell className="hidden sm:table-cell">
								{item.name}
							</TableCell>
							<TableCell>
								<Checkbox
									className="h-4 w-4"
									onCheckedChange={(value) => {
										handleCheckedChange(item.id);
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
