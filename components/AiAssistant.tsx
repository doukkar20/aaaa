
import React, { useState } from 'react';
import { getCarRecommendation } from '../services/geminiService';
import { CarCategory } from '../types';

interface AiAssistantProps {
  onRecommendation: (categories: CarCategory[]) => void;
  onReset: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ onRecommendation, onReset }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await getCarRecommendation(input);
    setResponse(result.explanation);
    onRecommendation(result.recommendedCategories as CarCategory[]);
    setLoading(false);
  };

  const handleClear = () => {
    setInput('');
    setResponse(null);
    onReset();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-50 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">AI Concierge</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Powered by Gemini</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tell us about your trip</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-slate-600"
            placeholder="e.g. I'm going for a romantic weekend in the mountains with my partner. I want something stylish but capable."
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              'Find Perfect Match'
            )}
          </button>
          {response && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-3 rounded-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          )}
        </div>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex gap-2 mb-2">
            <span className="text-blue-600 font-bold">LuxeAI:</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {response}
          </p>
        </div>
      )}
    </div>
  );
};
