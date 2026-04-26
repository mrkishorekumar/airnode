import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { mmkvStorage } from '../utils/mmkv-storage';

interface DownloadedModel {
  id: string;
  path: string; // The local URI returned by RNFS
  name: string;
}

const storageForDownloadedModels = createJSONStorage<DownloadedModel[]>(() => mmkvStorage);
const storageForActiveModelId = createJSONStorage<string | null>(() => mmkvStorage);

export const downloadedModelsAtom = atomWithStorage<DownloadedModel[]>('downloadedModels', [], storageForDownloadedModels);
export const activeModelIdAtom = atomWithStorage<string | null>('activeModelId', null, storageForActiveModelId);

