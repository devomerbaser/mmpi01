import { Answer, Results } from '../types/types';
import { questions } from '../data/questions';

export const calculateScores = (answers: Answer[]): Results => {
  const results: Results = {};
  
  // Initialize scales
  const scales: string[] = ['L', 'F', 'K', 'Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'];
  scales.forEach(scale => {
    results[scale] = {
      rawScore: 0,
      tScore: 50 // Base T-score
    };
  });

  // Calculate raw scores
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && answer.value) {
      results[question.scale].rawScore += question.rawScore;
    }
  });

  // Convert to T-scores (simplified conversion)
  Object.keys(results).forEach(scale => {
    const rawScore = results[scale].rawScore;
    // Simplified T-score calculation (in reality, this would use proper conversion tables)
    results[scale].tScore = 50 + (rawScore * 10);
  });

  return results;
};