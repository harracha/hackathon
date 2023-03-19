import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

import * as jwt from 'jsonwebtoken';
import customConfig from '../config/default';

export const createContext = async ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const getUserFromHeader = async () => {
		const token = req.cookies.token;
		if (!token) {
			return null;
		}
		try {
			const user = jwt.verify(token, customConfig.secret) as {
				userId: string;
				role: string;
			};
			const userId = user.userId;
			req.headers.authorization = userId;
			let role = user.role;
			return { userId, role };
		} catch {
			// clear cookie
			res.cookie('token', 'deleted', {
				...(process.env.NODE_ENV === 'production' && {
					sameSite: 'none',
					secure: true,
				}),
				maxAge: 1000 * 60 * 60, // 1h
				// httpOnly: true,
				// secure: true,
				// signed: true
			});
			return null;
		}
	};

	return {
		req,
		res,
		user: await getUserFromHeader(),
		cookie: req.headers.cookie,
	};
};
type Context = inferAsyncReturnType<typeof createContext>;
export default Context;

export const t = initTRPC.context<Context>().create();
