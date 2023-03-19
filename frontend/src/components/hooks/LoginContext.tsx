'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { trpc } from './TrpcProvider';

type User = {
	userId: string;
	role: string;
};

interface ILoginContext {
	loggedIn: boolean;
	user: User | null;
	enrollments: { subjectId: string; roleTitle: string }[];
	login: (input: { email: string; password: string }) => void;
	logout: () => void;
	refetch: () => void;
	// login: typeof trpc.auth.login.useMutation
}

const LoginContext = createContext<ILoginContext>({
	loggedIn: false,
	user: null,
	enrollments: [],
	login: (input: { email: string; password: string }) => {},
	logout: () => {},
	refetch: () => {},
});

function LoginProvider({ children }: { children: React.ReactNode }) {
	const [loginState, setLoginState] = useState<boolean>(false);
	// add maybe state and refresh on certain login

	const [user, setUser] = useState<User | null>(null);

	const me = trpc.auth.me.useQuery(undefined, { refetchInterval: 30000 });

	useEffect(() => {
		if (!me.data) {
			setLoginState(false);
			setUser(null);
		} else {
			setLoginState(true);
			setUser(me.data);
		}
	}, [me]);

	const login = trpc.auth.login.useMutation();
	const logout = trpc.auth.logout.useMutation();

	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(
		user ? user.userId : '',
		{ enabled: !!(user && user.userId) }
	);

	useEffect(() => {
		me.refetch();
	}, [login, logout]);

	return (
		<>
			<LoginContext.Provider
				value={{
					loggedIn: loginState,
					user: user,
					enrollments: enrolledSubjects.data
						? enrolledSubjects.data.map((es) => ({
								roleTitle: es.roleTitle,
								subjectId: es.subjectId,
						  }))
						: [],
					login: (input) => {
						login.mutate(input);
					},
					logout: () => {
						logout.mutate();
					},
					refetch: () => {
						me.refetch();
					},
				}}
			>
				{children}
			</LoginContext.Provider>
		</>
	);
}

const useLogin = () => useContext(LoginContext);
export default useLogin;

export { LoginProvider };
