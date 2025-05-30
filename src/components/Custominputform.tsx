import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control , FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'
import { z } from 'zod'

const formSchema = authFormSchema('sign-up');

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