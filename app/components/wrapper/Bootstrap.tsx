import { useCallback, useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import LoadingScreen from '../core/LoadingScreen';
import ModalListJson from '../../constants/modallist.json';
import GetModalList from '../../service/getModalList';
import { downloadedModelsAtom } from '../../store/modelStore';
import { Modal } from '../../types/Modal';
import DeviceInfo from 'react-native-device-info';
import { deviceInfoAtom } from '../../store/deviceInfoStore';
// import AppUnderMaintenance from '../core/AppUnderMaintenance';

type Props = {
  children: React.ReactNode;
};

function Bootstrap({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const setDownloadedModels = useSetAtom(downloadedModelsAtom);
  const setDeviceInfo = useSetAtom(deviceInfoAtom);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const remoteResponse = await GetModalList();
      console.log('Remote response:', remoteResponse);
      setDownloadedModels(remoteResponse);
    } catch {
      setDownloadedModels(ModalListJson as Modal[]);
    } finally {
      setIsLoading(false);
    }
  }, [setDownloadedModels]);

  const getDeviceInfo = useCallback(async () => {
    const ram = (await DeviceInfo.getTotalMemory()) / (1024 * 1024 * 1024);
    setDeviceInfo({ ram: Math.round(ram) });
  }, [setDeviceInfo]);

  useEffect(() => {
    Promise.all([fetchInitialData(), getDeviceInfo()]);
  }, [fetchInitialData, getDeviceInfo]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // if (data?.UTILS?.APP_SETTINGS?.APP_UNDER_MAINTENANCE) {
  //   return <AppUnderMaintenance />;
  // }

  return <>{children}</>;
}

export default Bootstrap;
