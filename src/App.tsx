import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './components/Form'
import { useDispatch, useSelector } from 'react-redux';
import { changeFormData } from './components/Redux/FormSlice';

import { RootState } from './components/Redux/Store';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb

const registerCompanySchema = z.object({
  company: z.string().nonempty("Company is a mandatory field"),
   address: z.string(),
  corp_date: z.coerce.date()
  .refine((date) => {
    return date <= new Date()
  }).transform(date => date.toISOString().substring(0,10)),
   document: z.instanceof(FileList)
  .refine((files) => files.item(0)!.size <= MAX_FILE_SIZE, `Maximum size is 5MB`)
  .transform(files => {
    return {...files.item(0)!}
  }) 
})

type CreateUserData = z.infer<typeof registerCompanySchema>

export function App() {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((state) => state);
/*   function handleSendFormData(){
    //console.log("currentState: ",state.data.CompanyData)
  } */

  function registerCompany(data: CreateUserData){
    console.log("data: ",data)
    dispatch(changeFormData(data))
}

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
          className="flex flex-col gap-4 w-full max-w-xs"
        >

            <Form.Field>
            <Form.Label htmlFor="company">
              Company Name
            </Form.Label>

            <Form.Input type="text" name="company" />
            <Form.ErrorMessage field="company" />
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
            <Form.Label htmlFor="corp_date">
              Corporation Date
            </Form.Label>
            <Form.Input type="date" name="corp_date" />
            <Form.ErrorMessage field="corp_date" />
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
   {/*    <button  
      onClick={handleSendFormData}
      className="bg-green-500 flex flex-col items-center justify-center text-white rounded px-3 h-10 font-semibold text-sm hover:bg-green-600">
        Send data
      </button> */}

    </main>
  )
}

