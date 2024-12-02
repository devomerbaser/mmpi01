import React from 'react';
import { Results as ResultsType, Patient } from '../types/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsProps {
  results: ResultsType;
  patient: Patient;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, patient, onReset }) => {
  const chartData = {
    labels: ['L', 'F', 'K', 'Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'],
    datasets: [
      {
        label: 'T-Scores',
        data: Object.values(results).map(score => score.tScore),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'MMPI Profile Chart'
      }
    },
    scales: {
      y: {
        min: 30,
        max: 120,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Test Results</h2>
        <p className="text-gray-600">
          Hasta Bilgileri: {patient.firstName} {patient.lastName}
        </p>
      </div>
      
      <div className="mb-8">
        <Line data={chartData} options={options} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Raw Scores & T-Scores</h3>
        {Object.entries(results).map(([scale, scores]) => (
          <div key={scale} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{scale}</span>
            <div className="text-right">
              <div>Raw Score: {scores.rawScore}</div>
              <div>T-Score: {scores.tScore}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="mt-8 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
      Yeni Bir Teste Başla
      </button>
    </div>
  );
};