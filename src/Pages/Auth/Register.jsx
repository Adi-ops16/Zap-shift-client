import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm()

    const { createUser, signInGoogle, updateUserInfo } = useAuth()

    const handleRegistration = (data) => {
        const profileImage = data.photo[0]
        createUser(data.email, data.password)
            .then(() => {
                // 1. store the image in form data
                const formData = new FormData()
                formData.append('image', profileImage)

                // 2. send the photo and get the photoURL
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to database")
                                }
                            })

                        // update user profile to firebase
                        const profileUpdate = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserInfo(profileUpdate)
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Registration successful",
                                    text: "Welcome to Zap-Shift",
                                    confirmButtonColor: '#CAEB66'
                                })
                                navigate(location.state || "/")
                            })
                            .catch(error => console.log("error from registration", error))
                    })
            })
            .catch(err => console.log(err))
    }

    const handleGoogle = () => {
        signInGoogle()
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Registration successful",
                    text: "Welcome to Zap-Shift",
                    confirmButtonColor: '#CAEB66'
                })

                // create user in the database
                const userInfo = {
                    email: res.user.email,
                    displayName: res.user.displayName,
                    photoURL: res.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log("user created with google login", res)
                    })

                navigate(location.state || "/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-82'>
                <h3 className='text-4xl font-bold text-secondary mb-1'>Create an account</h3>
                <p className='mb-3 font-bold '>Register with ZapShift</p>
                <form onSubmit={handleSubmit(handleRegistration)} className='max-w-96'>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label text-black">Name</label>
                        <input type="text"
                            className="input mb-2 focus-within:outline-0"
                            placeholder="your name"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        {errors.name?.type === "required" && <p className='text-red-500'>Name is required</p>}

                        {/* image field */}
                        <label className="label text-black">Photo</label>
                        <input type="file"
                            className="file-input focus-within:outline-0"
                            {...register('photo', {
                                required: true,
                            })}
                        />
                        {errors.name?.type === "required" && <p className='text-red-500'>Photo is required</p>}

                        {/* email field */}
                        <label className="label text-black">Email</label>
                        <input type="email"
                            className="input mb-2 focus-within:outline-0"
                            placeholder="Email"
                            {...register('email', {
                                required: true,
                            })}
                        />
                        {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}

                        {/* password field */}
                        <label className="label text-black">Password</label>
                        <input
                            type="password"
                            className="input focus-within:outline-0"
                            placeholder="Password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).{6,}$/
                            })}
                        />
                        {errors.password?.type === "pattern" && <p className='text-red-500'>Password must have one lowercase, one uppercase, one number and one special character</p>}
                        {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 characters or longer</p>}

                        <button className="btn btn-primary text-black border-none mt-4">Register</button>

                        <p className='font-bold'>Already have an account? <Link to="/auth/login" className='text-primary'>Login</Link></p>

                        <div className="divider">Or</div>

                    </fieldset>
                </form>
                <button onClick={handleGoogle} className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default Register;