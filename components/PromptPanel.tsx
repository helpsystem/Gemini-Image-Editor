
import React, { useState } from 'react';
import { Prompt, PromptCategory } from '../types';

interface PromptPanelProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  promptCategories: PromptCategory[];
  analyzePrompt: Prompt;
  disabled: boolean;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ onGenerate, isLoading, promptCategories, analyzePrompt, disabled }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(promptCategories[0]?.name || null);

  const handlePromptClick = (prompt: string) => {
    if (disabled || isLoading) return;
    setCustomPrompt('');
    onGenerate(prompt);
  };
  
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || isLoading || !customPrompt.trim()) return;
    onGenerate(customPrompt);
  };
  
  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const buttonClasses = `w-full text-left p-3 rounded-md transition duration-300 text-sm border border-base-300 flex flex-col`;
  const enabledClasses = `bg-base-200 hover:bg-base-300 hover:border-brand-primary`;
  const disabledClasses = `bg-base-300 cursor-not-allowed opacity-50`;

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-content-100">2. Choose an Edit</h2>
      
      {/* Analyze Button */}
      <button 
        onClick={() => handlePromptClick(analyzePrompt.english)}
        disabled={disabled || isLoading}
        className={`${buttonClasses} ${disabled || isLoading ? disabledClasses : `bg-brand-primary/20 hover:bg-brand-primary/30 border-brand-primary`}`}
      >
        <span className="font-semibold text-content-100">{analyzePrompt.persian}</span>
        <span className="text-xs text-content-200">{analyzePrompt.english}</span>
      </button>

      {/* Accordion for categories */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-content-200">Professional Prompts</h3>
        {promptCategories.map((category) => (
          <div key={category.name} className="border-b border-base-300 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex justify-between items-center p-2 text-left font-semibold text-content-100 hover:bg-base-300 rounded-t-md"
            >
              <span>{category.name}</span>
              <svg xmlns="http://www.w.org/2000/svg" className={`h-5 w-5 transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {openCategory === category.name && (
              <div className="p-2 space-y-2">
                {category.prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePromptClick(p.english)}
                    disabled={disabled || isLoading}
                    className={`${buttonClasses} ${disabled || isLoading ? disabledClasses : enabledClasses}`}
                  >
                    <span className="font-semibold text-content-100">{p.persian}</span>
                    <span className="text-xs text-content-200">{p.english}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium text-content-200 mb-2">Or, write a custom prompt</h3>
        <form onSubmit={handleCustomSubmit} className="flex space-x-2">
            <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Make the sky purple"
                disabled={disabled || isLoading}
                className="w-full bg-base-100 border border-base-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={disabled || isLoading || !customPrompt.trim()}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Go
            </button>
        </form>
      </div>
    </div>
  );
};

export default PromptPanel;
