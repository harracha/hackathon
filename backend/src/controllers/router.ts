import userRouter from "../domain/User/userRouter";
import authRouter from "../services/authentication/authRouter";
import { t } from "./trpc";

const todoRoutine = t.procedure.query(() => {
  return "Routine not yet implemented.";
});

// root router to call
const appRouter = t.router({
  auth: authRouter,
  user: userRouter,
  // connection: connectionRouter,
  // req: reqRouter,
  // device: deviceRouter,
});

export default appRouter;
