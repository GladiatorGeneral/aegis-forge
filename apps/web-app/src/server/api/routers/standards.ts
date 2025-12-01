import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { CommonCoreRepository, ChainOfThoughtReasoner, MultiPerspectiveReasoner } from '@phnxforge/mathematics-engine';

const standardsRepo = new CommonCoreRepository();

export const standardsRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return standardsRepo.getStandardById(input.id);
    }),

  getByGradeLevel: publicProcedure
    .input(z.object({ gradeLevel: z.string() }))
    .query(({ input }) => {
      return standardsRepo.getStandardsByGradeLevel(input.gradeLevel);
    }),

  getByDomain: publicProcedure
    .input(z.object({ domain: z.string() }))
    .query(({ input }) => {
      return standardsRepo.getStandardsByDomain(input.domain);
    }),

  getAll: publicProcedure
    .query(() => {
      return standardsRepo.getAllStandards();
    }),

  getPrerequisiteChain: publicProcedure
    .input(z.object({ standardId: z.string() }))
    .query(({ input }) => {
      return standardsRepo.getPrerequisiteChain(input.standardId);
    }),

  solveProblem: publicProcedure
    .input(z.object({
      problem: z.string(),
      perspectives: z.array(z.string()).optional().default(['algebraic', 'geometric', 'numerical'])
    }))
    .mutation(async ({ input }) => {
      const algebraicReasoner = new ChainOfThoughtReasoner();
      const geometricReasoner = new ChainOfThoughtReasoner();
      const numericalReasoner = new ChainOfThoughtReasoner();

      // Configure different perspectives
      algebraicReasoner
        .addStep('Algebraic formulation', undefined, 'Express problem as equations')
        .addStep('Solve equations', undefined, 'Apply algebraic techniques');

      geometricReasoner
        .addStep('Geometric interpretation', undefined, 'Visualize problem spatially')
        .addStep('Apply geometric principles', undefined, 'Use geometric properties and theorems');

      numericalReasoner
        .addStep('Numerical approximation', undefined, 'Set up numerical methods')
        .addStep('Compute solution', undefined, 'Execute calculations');

      const multiReasoner = new MultiPerspectiveReasoner();
      multiReasoner
        .addPerspective('algebraic', {
          id: 'algebraic',
          name: 'Algebraic Approach',
          approach: 'symbolic manipulation',
          assumptions: ['closed-form solution exists'],
          constraints: ['requires equation formulation']
        }, algebraicReasoner)
        .addPerspective('geometric', {
          id: 'geometric',
          name: 'Geometric Approach',
          approach: 'spatial reasoning',
          assumptions: ['problem has geometric interpretation'],
          constraints: ['requires visualization']
        }, geometricReasoner)
        .addPerspective('numerical', {
          id: 'numerical',
          name: 'Numerical Approach',
          approach: 'computational methods',
          assumptions: ['convergence criteria met'],
          constraints: ['approximate solution']
        }, numericalReasoner);

      const result = await multiReasoner.solve(input.problem);
      
      return {
        ...result,
        perspectives: Array.from(result.perspectives.entries()).map(([id, data]) => ({
          id,
          ...data
        }))
      };
    })
});
