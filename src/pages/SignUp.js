import React, {useState} from 'react';
import loginIcon from '../assets/logo1.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
    const [ showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ data, setData ] = useState({
        email : "",
        password : "",
        name : "",
        confirmPassword : "",
        profilePic : "",
    });

    const navigate = useNavigate()
    
    const handleOnChange = (e) => {
        const { name, value } = e.target
    
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
        setData((preve)=>{
            return{
                ...preve,
                profilePic : imagePic
            }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.signUp.url,{
            method : SummaryApi.signUp.method,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
        
        console.log("data", dataApi)
        }else{
            toast.error("Please check password and confirm password")
        }
    }
    
  return (
    <section id='signup'>
        <div className='mx-auto container p-10'>
            
            <div className='bg-white p-5 w-full max-w-sm mx-auto shadow rounded-2xl'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcon} alt='login icon' />
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer py-4 text-center absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic} />
                        </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-100 p-2 rounded-full'>
                            <input type='text' 
                            placeholder='enter your name'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2 rounded-full'>
                            <input type='email' 
                            placeholder='enter email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            required
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
                            required
                            className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }

                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex rounded-full'>
                            <input type={showConfirmPassword ? "text" : "password"} 
                            placeholder='enter confirm password' 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }

                                </span>
                            </div>
                        </div>
                    </div>

                    <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
                </form>
                <p className='my-5'>Already have account ? <Link to={"/login"} className='text-purple-600 hover:text-purple-700 hover:underline'>Login</Link></p>
            </div>

        </div>
    </section>
  )
}

export default SignUp