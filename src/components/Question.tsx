import React from 'react';
import { Question as QuestionType } from '../types/types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (questionId: number, value: boolean) => void;
  isAnswered: boolean;
  isActive: boolean;
}

export const Question: React.FC<QuestionProps> = ({ 
  question, 
  onAnswer, 
  isAnswered,
  isActive 
}) => {
  if (!isActive) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg shadow transition-all duration-300 ${
      isAnswered ? 'bg-blue-50' : 'bg-white'
    }`}>
      <p className="text-lg mb-4">{question.text}</p>
      <div className="flex gap-4">
        <button
          onClick={() => onAnswer(question.id, true)}
          disabled={isAnswered}
          className={`px-4 py-2 rounded transition ${
            isAnswered 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Evet
        </button>
        <button
          onClick={() => onAnswer(question.id, false)}
          disabled={isAnswered}
          className={`px-4 py-2 rounded transition ${
            isAnswered 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Hayır
        </button>
      </div>
    </div>
  );
};