
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';

const Dashboard = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!session){
        return redirect('/')
    }
    const user = session?.user
    
  return (
    <div className='mt-10 text-center'>
        <h1 className='text-2xl font-bold underline'> Welcome to dashboard</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
    </div>
  )
}

export default Dashboard