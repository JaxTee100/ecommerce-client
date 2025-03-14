"use client"
import Image from 'next/image'
import React from 'react';
import banner from '../../../../public/images/banner2.jpg'
import logo from '../../../../public/images/logo1.png'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from "next/navigation";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { protectSignInAction } from '@/actions/auth';

const LoginPage = () => {
   const [formData, setFormData] = React.useState({
      email: '',
      password: ''
    });

    const { login, isLoading}  = useAuthStore();
      const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev)  => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      });
    }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const checkFirstLevelOfValidation = await protectSignInAction(formData.email);
      console.log("Validation response:", checkFirstLevelOfValidation.message); 
      if(!checkFirstLevelOfValidation.success){
        toast.error(checkFirstLevelOfValidation.message);
        return;
    }
    
    const success = await login(formData.email, formData.password);
    if(success){
      toast.success('Login successful!!');
      const user = useAuthStore.getState().user 
      if(user?.role === "SUPER_ADMIN")router.push('/super-admin');
      else router.push('/home');
    }
  }
  return (
    <div className='min-h-screen bg-[#fff6f4] flex'>
      <div className='hidden lg:block w-1/2 bg-[#ffege1] relative overflow-hidden'>
        <Image src={banner} alt='register' fill style={{objectFit : 'cover', objectPosition: 'center'}} priority />

      </div>
      <div className='w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center'>
        <div className='max-w-md w-full mx-auto'>
          <div className='flex justify-center'>
            <Image src={logo} width={200} height={50} alt='logo'  />
          </div>
          <form className='space-y-4' onSubmit={handleSubmit}>

            <div className='space-y-1'>
              <label htmlFor='email'>Email</label>
              <Input 
                id='email' 
                type='text' 
                placeholder='Enter your Email' 
                className='bg-[#ffede1]'
                name='email'
                value={formData.email} 
                onChange={handleOnChange}
                required
              />
              
            </div>

            <div className='space-y-1'>
              <label htmlFor='password'>Password</label>
              <Input 
                id='password' 
                type='password' 
                placeholder='Enter your Password' 
                className='bg-[#ffede1]'
                name='password'
                value={formData.password} 
                onChange={handleOnChange}
                required
              />
              
            </div>
            <Button type='submit' className='w-full bg-black text-white hover:bg-black transition-colors cursor-pointer'>
              LOGIN
            </Button>
            <p className='text-center text-[#3f3d56] text-sm '>
              Don't have an account? <Link href={'/auth/register'} className='text-[#000] hover:underline font-bold'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage