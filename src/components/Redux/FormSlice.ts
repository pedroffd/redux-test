import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './Store';
import { useSelector } from 'react-redux';


export interface CompanyData {
  company: string,
  address: string,
  corp_date: string,
  document: File | null
}

const initialState: CompanyData = {
  company: 'Pedro Test',
  address: "Street 001",
  corp_date: '2023-03-25',
  document: null,
};


export const slice = createSlice({
  name: 'companyData',
  initialState: initialState,
  reducers: {
    changeFormData(state, { payload}){
//      console.log("payload: ",payload)
        return {...state, CompanyData: payload}
    },
    sendFormData(state){
      console.log("State: ",state)
      return {...state }
    }
  }
})
export const selectCompany = (state: RootState ) => state.data


export const { changeFormData, sendFormData } = slice.actions

export default slice.reducer