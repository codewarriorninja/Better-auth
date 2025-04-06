import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"

const Navbar = () => {
  return (
    <div className="border-b border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mx-auto max-w-4xl">
            <Link href={'/'}>
             <span className="font-bold">Better auth</span>
            </Link>
            <Button asChild className={buttonVariants()}>
                <Link href={'/sign-up'}>Sign Up</Link>
            </Button>
        </div>
    </div>
  )
}

export default Navbar