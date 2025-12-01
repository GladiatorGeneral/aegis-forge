import { router } from './trpc';
import { standardsRouter } from './routers/standards';

export const appRouter = router({
  standards: standardsRouter,
});

export type AppRouter = typeof appRouter;
