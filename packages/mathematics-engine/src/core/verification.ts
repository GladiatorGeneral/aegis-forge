import { ReasoningResult } from './reasoning/chain-of-thought';

export interface VerificationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface VerificationOptions {
  checkLogicalConsistency: boolean;
  checkMathematicalValidity: boolean;
  externalVerification: boolean;
}

export class Verifier {
  verify(result: ReasoningResult, options: VerificationOptions): boolean {
    if (options.checkLogicalConsistency && !result.verification.isValid) {
      return false;
    }

    if (options.checkMathematicalValidity && result.confidence < 0.7) {
      return false;
    }

    return true;
  }
}
