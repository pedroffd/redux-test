import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './redux/store';
import { ComplianceActionTypes, REGISTER_COMPLIANCE_REQUEST, REGISTER_COMPLIANCE_SUCCESS, REGISTER_COMPLIANCE_FAILURE } from './types';
import CryptoJS from "crypto-js";
interface FormData {
  companyName: string;
  corporationDate: string;
  address: string;
  document: File | null;
}

const apiUrl = 'https://example.com/register-compliance';

const registerCompliance = (
  formData: FormData
  ): ThunkAction<void, RootState, null, ComplianceActionTypes> => 
async (dispatch) => {
  try {
    dispatch({ type: REGISTER_COMPLIANCE_REQUEST });
   
    const secretKey = "XkhZG4fW2t2W";

    const encryptData = (data: string, secretKey: string): string => {
      const encrypted = CryptoJS.AES.encrypt(data, secretKey);
      return encrypted.toString();
    };

    const decryptedData = (encryptedData: string, secretKey: string): string => {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return decrypted.toString(CryptoJS.enc.Utf8);
    };
//console log has been left por testing purposes to make it easy to check on the deployed app
    const encryptedData = encryptData(JSON.stringify(formData), secretKey);
    console.log(`Encrypted data: ${encryptedData}`);


    const decrypted = decryptedData(encryptedData, secretKey);
    console.log(`Decrypted data: ${decrypted}`);

    console.log('formData: ',  JSON.stringify(formData))
    // make HTTP POST request to external web service
    const response = await axios.post(apiUrl, formData)
    //const response = await axios.post('https://example.com/register-compliance', formDataToSend);

    // dispatch success action with response data
    dispatch({
      type: REGISTER_COMPLIANCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // dispatch failure action with error message
    dispatch({
      type: REGISTER_COMPLIANCE_FAILURE,
      payload: 'Failed',
    });
  }
};

export { registerCompliance }