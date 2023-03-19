import { publicProcedure } from '../../../controllers/middleware/auth';

export default publicProcedure.query(({ ctx }) => {
	return ctx.user;
});
