'use client'
import Image from 'next/image'
import React, { use } from 'react';
import banner from '../../../../public/images/banner2.jpg'
import logo from '../../../../public/images/logo1.png'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { protectSignUpAction } from '@/actions/auth';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from "next/navigation";
import { ArrowRight } from 'lucide-react';


const RegisterPage = () => {

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const { register, isLoading}  = useAuthStore();
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
    const checkFirstLevelOfValidation = await protectSignUpAction(formData.email);
    console.log("Validation response:", checkFirstLevelOfValidation.message); // Debugging step
    if(!checkFirstLevelOfValidation.success){
      toast.error(checkFirstLevelOfValidation.message);
      return;
  }
  toast.success('Account created successfully');
  const userId = await register(formData.name, formData.email, formData.password);
  if(userId){
    router.push('/auth/login');
  }
}
  


  return (
    <div className='min-h-screen bg-[#fff6f4] flex'>
      <div className='hidden lg:block w-1/2 bg-[#ffege1] relative overflow-hidden'>
        <Image src={banner} alt='register' fill style={{objectFit : 'cover', objectPosition: 'center'}} priority />

      </div>
      <div className='w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center'>
        <div className='max-w-md w-full mx-auto'>
          <div className='flex justify-center relative'>
            <Image src={logo} width={200} height={50} alt='logo'  />
          </div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-1'>
              <label htmlFor='name'>Full name</label>
              <Input 
                id='name' 
                type='text' 
                placeholder='Enter your full name' 
                className='bg-[#ffede1]' 
                value={formData.name}
                name='name'
                onChange={handleOnChange} 
                required
              />
              
              
            </div>

            <div className='space-y-1'>
              <label htmlFor='email'>Email</label>
              <Input 
                id='email' 
                type='text' 
                placeholder='Enter your Email' 
                className='bg-[#ffede1]' 
                value={formData.email}
                name='email'
                onChange={handleOnChange} required
              />
              
            </div>

            <div className='space-y-1'>
              <label htmlFor='password'>Password</label>
              <Input 
                id='password'  
                type='password' 
                placeholder='Enter your Password' 
                className='bg-[#ffede1]'
                value={formData.password}
                name='password' 
                onChange={handleOnChange} required/>
              
            </div>
            <Button type='submit' disabled={isLoading} className='w-full bg-black text-white hover:bg-black transition-colors cursor-pointer'>
              {
                isLoading ? 'Creating Account....' : ( <> CREATE ACCOUNT <ArrowRight className='w-4 h-4 ml-2' /></>)
              }
            </Button>
            <p className='text-center text-[#3f3d56] text-sm '>
              Already have an account <Link href={'/auth/login'} className='text-[#000] hover:underline font-bold'>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;