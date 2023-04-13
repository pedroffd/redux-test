import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {registerCompliance}  from './registerCompliance';
import { Form } from './components/Form'
import { RootState } from './redux/store';
import { ComplianceActionTypes } from './types';
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerCompanySchema } from './schemas/registerCompanySchema'

type Dispatch = ThunkDispatch<RootState, null, ComplianceActionTypes>;

type CreateUserData = z.infer<typeof registerCompanySchema>

const ComplianceRegistrationForm: React.FC = () => {
 
  const dispatch: Dispatch = useDispatch();

  const registerCompany = (data: CreateUserData) => {
    
    dispatch(registerCompliance(data));
    // clear form data
  };

  const registerCompanyForm = useForm<CreateUserData>({
    resolver: zodResolver(registerCompanySchema),
  })

  const { 
    handleSubmit, 
    formState: { isSubmitting }, 
    watch,
  } = registerCompanyForm;

  return (
    <div className="flex flex-row gap-6 bg-gray-600 pt-4 pb-8 max-w-md mx-auto w-full opacity-90">
      <FormProvider {...registerCompanyForm}>
        <form 
          onSubmit={handleSubmit(registerCompany)}
          className="flex flex-col gap-4 space-y-4 md:space-y-6 m-8">
          <Form.Field>
              <Form.Label htmlFor="companyName">
                Company Name
              </Form.Label>

              <Form.Input type="text" name="companyName" />
              <Form.ErrorMessage field="companyName" />
            </Form.Field> 

            <Form.Field>
              <Form.Label htmlFor="document">
                Document
              </Form.Label>

              <Form.Input type="file" name="document" />
              <Form.ErrorMessage field="document" />
            </Form.Field> 

          <Form.Field>
              <Form.Label htmlFor="address">
                Address
              </Form.Label>
              <Form.Input type="text" name="address" />
              <Form.ErrorMessage field="address" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="corporationDate">
                Corporation Date
              </Form.Label>
              <Form.Input type="date" name="corporationDate" />
              <Form.ErrorMessage field="corporationDate" />
            </Form.Field>  
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
            >
              Save
            </button>
        </form>
    </FormProvider>
  </div>
  );
};

export  {ComplianceRegistrationForm};
