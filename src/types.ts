export const REGISTER_COMPLIANCE_REQUEST = 'REGISTER_COMPLIANCE_REQUEST';
export const REGISTER_COMPLIANCE_SUCCESS = 'REGISTER_COMPLIANCE_SUCCESS';
export const REGISTER_COMPLIANCE_FAILURE = 'REGISTER_COMPLIANCE_FAILURE';

interface RegisterComplianceRequestAction {
  type: typeof REGISTER_COMPLIANCE_REQUEST;
}

interface RegisterComplianceSuccessAction {
  type: typeof REGISTER_COMPLIANCE_SUCCESS;
  payload: any; // replace 'any' with the actual type of the response data
}

interface RegisterComplianceFailureAction {
  type: typeof REGISTER_COMPLIANCE_FAILURE;
  payload: string;
}

export type ComplianceActionTypes =
  | RegisterComplianceRequestAction
  | RegisterComplianceSuccessAction
  | RegisterComplianceFailureAction;
