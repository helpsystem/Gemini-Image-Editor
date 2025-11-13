
import React from 'react';
import { ImageFile } from '../types';

interface ResultDisplayProps {
  originalImage: ImageFile | null;
  editedImage: ImageFile | null;
  isLoading: boolean;
  error: string | null;
  onAcceptEdit: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Spinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
        <p className="text-content-200">AI is thinking...</p>
    </div>
);

const ImageCard: React.FC<{ title: string; image: ImageFile | null; children?: React.ReactNode }> = ({ title, image, children }) => (
    <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-center mb-4 text-content-100">{title}</h3>
        <div className="aspect-square bg-base-200 rounded-lg shadow-inner flex items-center justify-center border border-base-300 overflow-hidden">
            {image ? (
                 <img src={`data:${image.mimeType};base64,${image.base64}`} alt={title} className="w-full h-full object-contain" />
            ) : children}
        </div>
    </div>
);

const HistoryButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; ariaLabel: string }> = ({ onClick, disabled, children, ariaLabel }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="bg-base-300 hover:bg-brand-primary/50 text-content-100 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-base-300 inline-flex items-center"
    >
        {children}
    </button>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImage, isLoading, error, onAcceptEdit, onUndo, onRedo, canUndo, canRedo }) => {
    const handleDownload = () => {
        if (!editedImage) return;
        const link = document.createElement('a');
        link.href = `data:${editedImage.mimeType};base64,${editedImage.base64}`;
        link.download = `edited-${originalImage?.name || 'image.png'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const WelcomeMessage = () => (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to the AI Image Editor</h2>
        <p className="text-content-200">Upload an image and choose a prompt to get started!</p>
      </div>
    );

    return (
    <div className="bg-base-200 p-4 sm:p-6 rounded-lg shadow-md w-full h-full flex flex-col">
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4 text-center">{error}</div>}
        
        {!originalImage && !isLoading && !error && <WelcomeMessage />}
        
        {originalImage && (
            <>
                <div className="flex justify-center gap-4 mb-4">
                    <HistoryButton onClick={onUndo} disabled={!canUndo} ariaLabel="Undo last edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Undo
                    </HistoryButton>
                    <HistoryButton onClick={onRedo} disabled={!canRedo} ariaLabel="Redo last edit">
                        Redo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </HistoryButton>
                </div>
                <div className="flex flex-col md:flex-row gap-6 flex-grow">
                    <ImageCard title="Before" image={originalImage} />
                    <ImageCard title="After" image={editedImage}>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <div className="text-center text-content-200 p-4">
                                Your edited image will appear here.
                            </div>
                        )}
                    </ImageCard>
                </div>
            </>
        )}

        {editedImage && !isLoading && (
            <div className="mt-6 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
                 <button 
                    onClick={handleDownload}
                    className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out text-lg inline-flex items-center"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Image
                 </button>
                 <button 
                    onClick={onAcceptEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out text-lg inline-flex items-center"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    Use This Image
                 </button>
            </div>
        )}
    </div>
    );
};

export default ResultDisplay;
