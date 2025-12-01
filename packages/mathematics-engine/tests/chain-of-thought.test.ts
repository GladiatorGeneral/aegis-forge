import { describe, it, expect } from 'vitest';
import { ChainOfThoughtReasoner } from '../src/core/reasoning/chain-of-thought';

describe('ChainOfThoughtReasoner', () => {
  it('should create valid reasoning chains', () => {
    const reasoner = new ChainOfThoughtReasoner();
    
    const result = reasoner
      .addStep('Identify the problem', '2 + 3', 'Basic arithmetic addition')
      .addStep('Perform addition', undefined, 'Combine the numbers')
      .setConfidence(1, 0.95)
      .getResult(5);

    expect(result.steps).toHaveLength(2);
    expect(result.finalAnswer).toBe(5);
    expect(result.confidence).toBeGreaterThan(0.9);
    expect(result.verification.isValid).toBe(true);
  });

  it('should detect low confidence chains', () => {
    const reasoner = new ChainOfThoughtReasoner();
    
    const result = reasoner
      .addStep('Uncertain step', undefined, 'Guess')
      .setConfidence(1, 0.5)
      .getResult('guess');

    expect(result.verification.warnings.some(w => w.includes('low confidence'))).toBe(true);
  });

  it('should detect missing justifications', () => {
    const reasoner = new ChainOfThoughtReasoner();
    
    const result = reasoner
      .addStep('Step without justification', 'x = 5', '')
      .getResult(5);

    expect(result.verification.warnings.some(w => w.includes('lacks proper justification'))).toBe(true);
  });

  it('should calculate overall confidence correctly', () => {
    const reasoner = new ChainOfThoughtReasoner();
    
    const result = reasoner
      .addStep('Step 1', undefined, 'Good reasoning')
      .setConfidence(1, 1.0)
      .addStep('Step 2', undefined, 'Also good')
      .setConfidence(2, 0.8)
      .getResult(42);

    expect(result.confidence).toBe(0.9);
  });
});
