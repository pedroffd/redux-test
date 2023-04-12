import { combineReducers } from 'redux';
import {
  ComplianceActionTypes,
  REGISTER_COMPLIANCE_REQUEST,
  REGISTER_COMPLIANCE_SUCCESS,
  REGISTER_COMPLIANCE_FAILURE,
} from './types';

interface ComplianceState {
  loading: boolean;
  data: any; // replace 'any' with the actual type of the compliance data
  error: string | null;
}

const initialComplianceState: ComplianceState = {
  loading: false,
  data: null,
  error: null,
};

const complianceReducer = (
  state = initialComplianceState,
  action: ComplianceActionTypes
): ComplianceState => {
  switch (action.type) {
    case REGISTER_COMPLIANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_COMPLIANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case REGISTER_COMPLIANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  compliance: complianceReducer,
});

export {rootReducer} ;
