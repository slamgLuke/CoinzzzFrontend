import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import FollowCoinTable from "./FollowCoinTable";
import { useNavigate } from "react-router-dom";

export function FollowCoinMenu({ coinData, userId }) {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	let open = 0;
	const setOpen = () => {
		if (open < 2) {
			open += 1;
		} else {
			window.location.href = "/dashboard/seguimiento";
		}
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleCloseDialog = () => {
		// Aquí puedes ajustar la redirección según tu lógica
		console.log("Dialog closed");
		useNavigate()("/dashboard/seguimiento"); // Redirige a la pestaña 'seguimiento' de tu Dashboard
	};

	useEffect(() => {
		// if (!open) {
		// 	console.log("Dialog open: ", open);
		// 	window.location.href = "/dashboard/seguimiento";
		// }
	}, [open]);

	// const filteredCoinData = coinData.filter(
	// 	(coin) =>
	// 		coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
	// );

	const filteredCoinData = coinData.filter((coin) =>
		coin._id.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Dialog onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<Plus strokeWidth={3} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<form className="w-full">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search coins..."
								className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-2/3"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
					</form>
				</DialogHeader>
				<FollowCoinTable coinData={filteredCoinData} userId={userId} />
			</DialogContent>
		</Dialog>
	);
}

export default FollowCoinMenu;
