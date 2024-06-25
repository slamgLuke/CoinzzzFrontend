import { Link, Outlet } from "react-router-dom";
import {
	CircleUser,
	Home,
	Menu,
	Search,
	Coins,
	BriefcaseBusiness,
	Settings,
} from "lucide-react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import "./searchBox.css";
import { useUser } from "./UserContext";

const activeLinkCss =
	"flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
const activeLinkCssMobile =
	"mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground";
const inactiveLinkCss =
	"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
const inactiveLinkCssMobile =
	"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";

export function MainBar({ coinData, followList }) {
	const [activeLink, setActiveLink] = useState(
		window.location.pathname.split("/")[1],
	);

	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const { setUserId } = useUser();

	const handleValueChange = (value: string) => {
		setInputValue(value);
		setOpen(!!value);
	};

	const filteredCoinData = coinData.filter((coin) =>
		coin._id.toLowerCase().includes(inputValue.toLowerCase()),
	);

	function setCss(link: string) {
		return activeLink === link ? activeLinkCss : inactiveLinkCss;
	}

	function setCssMobile(link: string) {
		return activeLink === link ? activeLinkCssMobile : inactiveLinkCssMobile;
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
						<Link to="/" className="flex items-center gap-2 font-semibold">
							<Coins className="h-6 w-6" />
							<span className="">CoinZZZ</span>
						</Link>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								to="dashboard"
								className={setCss("dashboard")}
								onClick={() => setActiveLink("dashboard")}
							>
								<Home className="h-4 w-4" />
								Dashboard
							</Link>
							<Link
								to="portfolio"
								className={setCss("portfolio")}
								onClick={() => setActiveLink("portfolio")}
							>
								<BriefcaseBusiness className="h-4 w-4" />
								Portfolio
							</Link>
							<Link
								to="settings"
								className={setCss("settings")}
								onClick={() => setActiveLink("settings")}
							>
								<Settings className="h-4 w-4" />
								Settings{" "}
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									to="/"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Coins className="h-6 w-6" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								<Link
									to="dashboard"
									className={setCssMobile("dashboard")}
									onClick={() => setActiveLink("dashboard")}
								>
									<Home className="h-5 w-5" />
									Dashboard
								</Link>
								<Link
									to="portfolio"
									className={setCssMobile("portfolio")}
									onClick={() => setActiveLink("portfolio")}
								>
									<BriefcaseBusiness className="h-5 w-5" />
									Portfolio
								</Link>
								<Link
									to="settings"
									className={setCssMobile("settings")}
									onClick={() => setActiveLink("settings")}
								>
									<Settings className="h-5 w-5" />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1 relative">
						<Command className="rounded-lg border shadow-md">
							<CommandInput
								placeholder="Type to search..."
								onValueChange={handleValueChange}
							/>
							{
								<CommandList className="absolute-command-list">
									{open &&
										filteredCoinData.length > 0 &&
										filteredCoinData.map((coin) => (
											<CommandItem
												key={coin._id}
												value={coin._id}
												onSelect={(value) => alert(`Selected: ${value}`)}
											>
												{coin.name}
											</CommandItem>
										))}
								</CommandList>
							}
						</Command>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<Link to="register">
								<DropdownMenuItem>Register</DropdownMenuItem>
							</Link>
							<Link to="login">
								<DropdownMenuItem>Login </DropdownMenuItem>
							</Link>
							<Link to="settings" onClick={() => setActiveLink("settings")}>
								<DropdownMenuItem>Settings</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									setUserId("");
									window.location.href = "/";
								}}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>

				<Outlet context={{ coinData, followList }} />
			</div>
		</div>
	);
}

export default MainBar;
