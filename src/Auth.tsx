import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
// import { useUser, UserContextType } from "./UserContext";
import UserContext, { UserContextType } from "./UserContext";

const apiIP = import.meta.env.VITE_USER_API_IP || "localhost";

export class Auth extends React.Component {
	static contextType = UserContext as React.Context<UserContextType>;
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			AuthType: props.authType,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin = async () => {
		try {
			const body = {
				email: this.state.email,
				password: this.state.password,
			};
			const response = await fetch(`${apiIP}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Login data:", data);
			const { setUserId } = this.context as UserContextType;
			setUserId(data.token);
		} catch (error) {
			console.error("Failed to login:", error);
		} finally {
			alert("Login: " + this.state.email + " " + this.state.password);
		}
		// TODO: store token
	};

	handleRegister = async () => {
		try {
			const body = {
				email: this.state.email,
				password: this.state.password,
			};
			const response = await fetch(`${apiIP}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Registered data:", data);
		} catch (error) {
			console.error("Failed to register:", error);
		} finally {
			alert("Register: " + this.state.email + " " + this.state.password);
		}
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		if (this.state.AuthType === "login") {
			await this.handleLogin();
			window.location.href = "/";
		} else {
			await this.handleRegister();
			// reload page to login
			this.state.AuthType = "register";
			window.location.href = "/login";
			window.location.reload();
		}
	};

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	render() {
		if (this.state.AuthType === "login") {
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
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										value={this.state.email}
										onChange={this.handleChange}
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											to="#"
											className="ml-auto inline-block text-sm underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input
										id="password"
										type="password"
										value={this.state.password}
										onChange={this.handleChange}
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									onClick={this.handleSubmit}
								>
									Login
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link
									to="/register"
									className="underline"
									onClick={window.location.reload}
								>
									Register
								</Link>
							</div>
						</div>
					</div>
					<div className="hidden bg-muted lg:block">{/* Image here */}</div>
				</div>
			);
		} else {
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
										value={this.state.email}
										onChange={this.handleChange}
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input
										id="password"
										type="password"
										value={this.state.password}
										onChange={this.handleChange}
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									onClick={this.handleSubmit}
								>
									Register
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="underline"
									onClick={window.location.reload}
								>
									Log in
								</Link>
							</div>
						</div>
					</div>
					<div className="hidden bg-muted lg:block">{/* Image here */}</div>
				</div>
			);
		}
	}
}
