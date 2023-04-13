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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb

const registerCompanySchema = z.object({
  companyName: z.string().nonempty({
    message: 'Company Name is mandatory',
  }).transform(name => {
    return name
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  corporationDate: z.coerce.date()
  .refine((date) => {
    return date <= new Date()
  }).transform(date => date.toISOString().substring(0,10)),

  address: z.string(),
  
  document: z.instanceof(FileList)
    .refine((files) => files.item(0)!.size <= MAX_FILE_SIZE, `Maximum size is 5MB`)
    .transform(files => {
      return files.item(0)!
    }),
})

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
    <main className="h-screen flex flex-row gap-6 items-center justify-center">
      <FormProvider {...registerCompanyForm}>
    <form 
      
      onSubmit={handleSubmit(registerCompany)}
      className="flex flex-col gap-4 w-full max-w-xs">
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
  </main>
  );
};

export  {ComplianceRegistrationForm};
