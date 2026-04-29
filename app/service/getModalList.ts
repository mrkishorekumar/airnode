import ModalListJson from '../constants/modallist.json';
import { Modal } from '../types/Modal';

async function GetModalList(): Promise<Modal[]> {
  try {
    const response = await fetch('https://rigial.com/json/airnode/modals.json');
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      return ModalListJson; // Fallback to local JSON if fetch fails
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching modal list:', error);
    return ModalListJson; // Fallback to local JSON if fetch fails
  }
}

export default GetModalList;
