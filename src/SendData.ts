
import { CompanyData } from './components/Redux/FormSlice'
import https from 'https'; 

const createCompany = (company: CompanyData) => {
  const postData = JSON.stringify(company);
  const options = {
    hostname: 'example.com',
    port: 443,
    path: '/api/companies',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(postData);
  req.end();
};

export { createCompany }



// Example usage
const company: CompanyData = {
    company: 'Pedro Test',
    address: "Street 001",
    corp_date: '2023-03-25',
    document: null,
  };

createCompany(company);
