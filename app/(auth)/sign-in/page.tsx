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
import { signInFormSchema } from "@/lib/auth-schema"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const SignIn = () => {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
          email:"",
          password:"",
        },
      })
     
      async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const {email, password} = values;
        const {data, error} = await authClient.signIn.email({
          email, 
          password, 
          callbackURL:'/dashboard'
        },{
          onRequest:(ctx) => {
            toast('Please wait......');
            console.log(ctx);
          },
          onSuccess:(ctx) =>{
            form.reset();
            toast('Successfuly Logged in');
            console.log(ctx);
          },
          onError:(ctx) =>{
            toast(`${ctx}`);
          }
        })
        console.log(data,error)
      }

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription>
                Welcome back! please sign in to continue
            </CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Don&rsquo;t have an account yet? {' '}
                <Link href={'/sign-up'} className="text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </CardFooter>
    </Card>
  )
}

export default SignIn