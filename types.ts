
export interface ImageFile {
  name: string;
  base64: string;
  mimeType: string;
}

export interface Prompt {
  id: string;
  english: string;
  persian: string;
}

export interface PromptCategory {
    name: string;
    prompts: Prompt[];
}
