import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { mmkvStorage } from '../utils/mmkv-storage';
import { Modal } from '../types/Modal';

const storageForDownloadedModels = createJSONStorage<Modal[]>(
  () => mmkvStorage,
);
const storageForActiveModelId = createJSONStorage<string | null>(
  () => mmkvStorage,
);

export const downloadedModelsAtom = atomWithStorage<Modal[]>(
  'downloadedModels',
  [],
  storageForDownloadedModels,
);
export const activeModelIdAtom = atomWithStorage<string | null>(
  'activeModelId',
  null,
  storageForActiveModelId,
);
