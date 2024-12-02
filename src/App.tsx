import React, { useState } from 'react';
import { Question } from './components/Question';
import { Results } from './components/Results';
import { PatientForm } from './components/PatientForm';
import { questions } from './data/questions';
import { Answer, Patient } from './types/types';
import { Brain } from 'lucide-react';
import { calculateScores } from './utils/scoring';

function App() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handlePatientSubmit = (patientData: Patient) => {
    setPatient(patientData);
  };

  const handleAnswer = (questionId: number, value: boolean) => {
    setAnswers(prev => [...prev.filter(a => a.questionId !== questionId), { questionId, value }]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    if (answers.length === questions.length) {
      setIsComplete(true);
    }
  };

  const resetTest = () => {
    setPatient(null);
    setAnswers([]);
    setCurrentQuestion(0);
    setIsComplete(false);
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Brain className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">MMPI Testi</h1>
          </div>
          <PatientForm onSubmit={handlePatientSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">MMPI Testi</h1>
        </div>

        {!isComplete ? (
          <div>
            <div className="mb-4">
              <p className="text-gray-600 text-center">
                Hasta: {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div className="mb-4 text-center">
              <span className="text-sm text-gray-600">
                Soru {currentQuestion + 1} / {questions.length}
              </span>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
                />
              </div>
            </div>

            {questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                onAnswer={handleAnswer}
                isAnswered={answers.some(a => a.questionId === question.id)}
                isActive={index === currentQuestion}
              />
            ))}
            
            {answers.length === questions.length && (
              <button
                onClick={handleComplete}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Sonuçları Göster
              </button>
            )}
          </div>
        ) : (
          <Results 
            results={calculateScores(answers)} 
            patient={patient}
            onReset={resetTest} 
          />
        )}
      </div>
    </div>
  );
}

export default App;