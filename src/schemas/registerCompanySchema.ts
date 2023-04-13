import { z } from 'zod'

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

export {registerCompanySchema}