import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "./UserContext";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { userId, setUserId } = useUser();

	async function handleLogin(event) {
		event.preventDefault();
		console.log(JSON.stringify({ email, password }));
		try {
			const response = await fetch("http://192.168.56.117:3001/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			// const token = data.token;
			const token = await response.json();

			// Guarda el token en el almacenamiento local o en algún otro lugar seguro
			// localStorage.setItem("token", token);
			console.log(token.token);
			setUserId(token.token);

			// Redirige al usuario
			window.location.href = "/";
		} catch (error) {
			console.error("Error during login:", error);
			// Maneja el error, muestra un mensaje, etc.
		}
	}

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<form className="grid gap-4" onSubmit={handleLogin}>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link to="#" className="ml-auto inline-block text-sm underline">
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/register" className="underline">
							Register
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">{/* Image here */}</div>
		</div>
	);
}

export function Register() {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Register</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" required />
						</div>
						<Button type="submit" className="w-full">
							Register
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to="/login" className="underline">
							Log in
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">{/* Image here */}</div>
		</div>
	);
}
