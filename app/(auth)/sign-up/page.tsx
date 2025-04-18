'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/auth-schema"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const SignUp = () => {
  const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email:"",
          password:"",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        const {name, email, password} = values;
        const {data, error} = await authClient.signUp.email({
          name, 
          email, 
          password, 
        },{
          onRequest:(ctx) => {
            toast('Please wait......');
            console.log(ctx);
          },
          onSuccess:(ctx) =>{
            form.reset();
            toast('Successfuly Signed up');
            console.log(ctx);
            router.push('/sign-in')
          },
          onError:(ctx) =>{
            console.log(ctx)
          }
        })
        console.log(data,error)
      }

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col justify-center items-center space-y-2">
            <CardTitle className="text-center">Sign Up</CardTitle>
            <CardDescription>
               Create your account to get started.
            </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Submit</Button>
      </form>
    </Form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground">
                Already have an account yet? {' '}
                <Link href={'/sign-in'} className="text-primary hover:underline">
                    Sign In
                </Link>
            </p>
        </CardFooter>
    </Card>
  )
}

export default SignUp