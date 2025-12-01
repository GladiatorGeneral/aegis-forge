export type DimensionType = 'conceptual' | 'procedural' | 'applied';

export interface Assessment {
  id: string;
  standardCode: string;
  dimension: DimensionType;
  question: string;
  expectedAnswer: any;
  rubric: AssessmentRubric;
}

export interface AssessmentRubric {
  maxScore: number;
  criteria: RubricCriterion[];
}

export interface RubricCriterion {
  description: string;
  points: number;
  dimension: DimensionType;
}

export interface AssessmentResult {
  assessmentId: string;
  studentAnswer: any;
  score: number;
  maxScore: number;
  feedback: string;
  dimensionScores: Map<DimensionType, number>;
}

export class AssessmentEngine {
  evaluate(assessment: Assessment, studentAnswer: any): AssessmentResult {
    const dimensionScores = new Map<DimensionType, number>();
    let totalScore = 0;

    assessment.rubric.criteria.forEach(criterion => {
      const score = this.evaluateCriterion(criterion, studentAnswer, assessment.expectedAnswer);
      totalScore += score;
      
      const currentScore = dimensionScores.get(criterion.dimension) || 0;
      dimensionScores.set(criterion.dimension, currentScore + score);
    });

    return {
      assessmentId: assessment.id,
      studentAnswer,
      score: totalScore,
      maxScore: assessment.rubric.maxScore,
      feedback: this.generateFeedback(totalScore, assessment.rubric.maxScore),
      dimensionScores
    };
  }

  private evaluateCriterion(
    criterion: RubricCriterion,
    studentAnswer: any,
    expectedAnswer: any
  ): number {
    const isCorrect = JSON.stringify(studentAnswer) === JSON.stringify(expectedAnswer);
    return isCorrect ? criterion.points : 0;
  }

  private generateFeedback(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return 'Excellent work! You have mastered this concept.';
    if (percentage >= 70) return 'Good job! Review the areas where you lost points.';
    if (percentage >= 50) return 'You\'re on the right track. Keep practicing!';
    return 'This concept needs more practice. Review the material and try again.';
  }
}
