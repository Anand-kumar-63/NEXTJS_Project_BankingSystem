import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control , FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'
import { z } from 'zod'

const formSchema = authFormSchema("sign-up");
// Why This CustomInputs Props Required name can be different such as for signin we can have email , password and for signup name can be email , password , Firstname , Lastname , Gender , ssn and many more so you have to use FieldPath<z.infer<typeof formSchema>> this will return a whole object containing all the feilds that are mentions above so that you can pass any field from the parent to this component and use it.. 
/*{
    firstName: z.ZodString | z.ZodOptional<z.ZodString>;
    lastName: z.ZodString | z.ZodOptional<z.ZodString>;
    address1: z.ZodString | z.ZodOptional<z.ZodString>;
    city: z.ZodString | z.ZodOptional<z.ZodString>;
    state: z.ZodString | z.ZodOptional<z.ZodString>;
    postalCode: z.ZodString | z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodString | z.ZodOptional<z.ZodString>;
    ssn: z.ZodString | z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}*/
interface custominputs{
       name:FieldPath<z.infer<typeof formSchema>>,
       label:string,
       control:Control<z.infer<typeof formSchema>>,
       placeholder:string
  }
const Custominputform = ({control,label,name ,placeholder}:custominputs) => { 
  return (
    <div>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                placeholder={placeholder}
                type={name}
                className=''
                {...field} /> 

              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
    </div>
  )
}

export default Custominputform