import React, { useContext, useState } from 'react';
import loginIcon from '../assets/logo1.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [ showPassword, setShowPassword] = useState(false);
    const [ data, setData ] = useState({
        email : "",
        password : ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const authToken = localStorage.getItem("authToken");
            const dataResponse = await fetch(SummaryApi.signIn.url,{
                method: SummaryApi.signIn.method,
                credentials : "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body : JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                localStorage.setItem("authToken", dataApi.token);
                await fetchUserDetails();
                await fetchUserAddToCart();
                navigate('/');

            } else {
                toast.error(dataApi.message);
            }

        } catch (error) {
            toast.error("An error occurred, please try again.");
            console.error("Error during login:", error);
        }
    }


  return (
    <section id='login'>
        <div className='mx-auto container p-10'>
            
            <div className='bg-white p-5 w-full max-w-sm mx-auto shadow rounded-2xl'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcon} alt='login icon' />
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2 rounded-full'>
                            <input type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex rounded-full'>
                            <input type={showPassword ? "text" : "password"} 
                            placeholder='enter password' 
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }

                                </span>
                            </div>
                        </div>
                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-purple-600'>
                            Forgot Password ?
                        </Link>
                    </div>

                    <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-purple-600 hover:text-purple-700 hover:underline'>Sign up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login