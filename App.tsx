
import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from './services/geminiService';
import { ImageFile } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptPanel from './components/PromptPanel';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { PROMPT_CATEGORIES, ANALYZE_PROMPT } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageFile: ImageFile | null) => {
    setOriginalImage(imageFile);
    setEditedImage(null);
    setError(null);
  };

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithPrompt(originalImage.base64, originalImage.mimeType, prompt);
      setEditedImage(result);
    } catch (e) {
      console.error(e);
      setError("Failed to edit the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleAcceptEdit = () => {
    if (editedImage) {
      setOriginalImage(editedImage);
      setEditedImage(null);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-content-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8 space-y-8">
              <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />
              <PromptPanel 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                promptCategories={PROMPT_CATEGORIES}
                analyzePrompt={ANALYZE_PROMPT}
                disabled={!originalImage}
              />
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ResultDisplay 
              originalImage={originalImage} 
              editedImage={editedImage} 
              isLoading={isLoading} 
              error={error} 
              onAcceptEdit={handleAcceptEdit}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
