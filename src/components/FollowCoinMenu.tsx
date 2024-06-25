import { useState, useRef } from "react";
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

export function FollowCoinMenu({ coinData, followList, userId }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [open, setOpen] = useState(false);
	const firstTimeRef = useRef(true);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleOnOpenChange = (isOpen) => {
		setOpen(isOpen);
		if (!isOpen && !firstTimeRef.current) {
			window.location.href = "/dashboard/seguimiento";
		}
		firstTimeRef.current = false;
	};

	// const filteredCoinData = coinData.filter(
	// 	(coin) =>
	// 		coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
	// );

	const filteredCoinData = coinData.filter((coin) =>
		coin._id.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Dialog open={open} onOpenChange={handleOnOpenChange}>
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
				<FollowCoinTable
					coinData={filteredCoinData}
					followList={followList}
					userId={userId}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default FollowCoinMenu;
