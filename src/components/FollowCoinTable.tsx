import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export function FollowCoinTable({ coinData }) {
	const handleCheckedChange = (_id) => {
		console.log("Checked coin ID:", _id);
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
									onCheckedChange={(value) => {
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
