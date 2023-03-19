import { publicProcedure } from '../../../controllers/middleware/auth';

export default publicProcedure.mutation(({ ctx }) => {
	// ctx.res.clearCookie('token');
	ctx.res.cookie('token', 'deleted', {
		...(process.env.NODE_ENV === 'production' && {
			sameSite: 'none',
			secure: true,
		}),
		maxAge: 1000 * 60 * 60, // 1h
		// httpOnly: true,
		// secure: true,
		// signed: true
	});
	return 'logged out successfully';
});
