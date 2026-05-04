export interface Modal {
  id: string;
  category: string;
  name: string;
  description: string;
  size: string;
  isEnabled: boolean;
  minRam: number;
  url: string;
  author: string;
  hfUrl: string;
  source: string;
  capabilities?: string[];
}
export interface ActiveModal extends Modal {
  downloadedModelPath: string;
}
