import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from "next/navigation"

const Navbar = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
});

  return (
    <div className="border-b border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mx-auto max-w-4xl">
            <Link href={'/'}>
             <span className="font-bold">Better auth</span>
            </Link>

            {
              session ? (
                <form action={async () => {
                  'use server'
                  await auth.api.signOut({
                    headers: await headers()
                  })
                  redirect('/')
                }}>
                  <Button type="submit" className="cursor-pointer">
                    LogOut
                  </Button>
                </form>
              ):(
              <Button asChild className={buttonVariants()}>
                <Link href={'/sign-up'}>Sign Up</Link>
            </Button>
              )
            }
        </div>
    </div>
  )
}

export default Navbar