import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { mmkvStorage } from '../utils/mmkv-storage';
import { ActiveModal, Modal } from '../types/Modal';

const storageForDownloadedModels = createJSONStorage<Modal[]>(
  () => mmkvStorage,
);
const storageForActiveModelId = createJSONStorage<ActiveModal | null>(
  () => mmkvStorage,
);

export const downloadedModelsAtom = atomWithStorage<Modal[]>(
  'downloadedModels',
  [],
  storageForDownloadedModels,
);
export const activeModelIdAtom = atomWithStorage<ActiveModal | null>(
  'activeModelId',
  null,
  storageForActiveModelId,
);

export const modalListAtom = atom(get => get(downloadedModelsAtom));

export const modalListAtomLength = atom(get => get(downloadedModelsAtom).length);