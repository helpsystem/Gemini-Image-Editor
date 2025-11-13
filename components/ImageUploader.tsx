
import React, { useRef, useCallback } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile | null) => void;
  originalImage: ImageFile | null;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // Remove the data:mime/type;base64, part
    };
    reader.onerror = (error) => reject(error);
  });

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-content-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        onImageUpload({ name: file.name, base64, mimeType: file.type });
      } catch (error) {
        console.error('Error converting file to base64', error);
        onImageUpload(null);
      }
    }
  }, [onImageUpload]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-content-100">1. Upload Image</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {originalImage ? (
        <div className="space-y-3">
          <div className="aspect-square w-full rounded-md overflow-hidden border-2 border-base-300">
             <img src={`data:${originalImage.mimeType};base64,${originalImage.base64}`} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-content-200 truncate" title={originalImage.name}>{originalImage.name}</p>
          <button
            onClick={handleClear}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Clear Image
          </button>
        </div>
      ) : (
        <div
          onClick={handleUploadClick}
          className="aspect-square w-full border-2 border-dashed border-base-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-base-300 transition duration-300"
        >
          <UploadIcon />
          <p className="mt-2 text-sm text-content-200">Click to upload</p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
