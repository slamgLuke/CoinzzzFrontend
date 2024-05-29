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

export function FollowCoinMenu() {
	return (
		<Dialog>
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
							/>
						</div>
					</form>
				</DialogHeader>
				<FollowCoinTable />
			</DialogContent>
		</Dialog>
	);
}

export default FollowCoinMenu;
