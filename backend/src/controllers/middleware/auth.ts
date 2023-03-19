import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user || ctx.user === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const isAdmin = t.middleware(({ next, ctx }) => {
  if (ctx.user!.role != "ADMIN" && ctx.user!.role != "SUPERADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Operation not permitted: you must be an Admin.",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAuthed).use(isAdmin);
