import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
	userId: string;
	setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// const [userId, setUserId] = useState<string>("");

	const [userId, setUserIdState] = useState<string>(() => {
		const storedUserId = localStorage.getItem("userId");
		return storedUserId || "";
	});

	const setUserId = (id: string) => {
		localStorage.setItem("userId", id);
		setUserIdState(id);
	};

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export default UserContext;
