import React from 'react'
import ReactDOM from 'react-dom/client'
import {ComplianceRegistrationForm}  from './ComplianceRegistrationForm'
import './global.css'
import { Provider } from 'react-redux';
import {store} from './redux/store'
import { FormHeader } from './components/FormHeader'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <main id='container' className='h-screen bg-landingPage bg-cover flex flex-col items-center justify-center px-4 mx-auto md:h-screen lg:py-0
      '>{/* This is our container */}
        <FormHeader /> 
        <ComplianceRegistrationForm />
      </main>
  </Provider>
  </React.StrictMode>,
)


