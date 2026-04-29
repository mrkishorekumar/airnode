import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { mmkvStorage } from '../utils/mmkv-storage';
import { DeviceInfo } from '../types/DeviceInfo';

const deviceInfo = {
  ram: 0,
};

const storageForDeviceInfo = createJSONStorage<DeviceInfo>(() => mmkvStorage);

export const deviceInfoAtom = atomWithStorage<DeviceInfo>(
  'deviceInfo',
  deviceInfo,
  storageForDeviceInfo,
);
