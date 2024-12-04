"use client";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {SignIn} from "@/app/services/authService";
import {setCookie} from "cookies-next";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

type FromData = {
    email: string;
    password: string;
}

export default function Login() {
    const navi = useRouter();
    const pathName = usePathname()
    const {register, handleSubmit, formState: {errors}} = useForm<FromData>()
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('redirected')) {
            toast.success('You must be logged in!', {autoClose: 1500, hideProgressBar: false})
            navi.replace(pathName);
        }
    }, [navi, pathName]);

    const onSubmit = async (data: FromData) => {
        try {
            const res = await SignIn(data)
            if (res) {
                const token = res?.token;
                toast.success("Login Successfully!", {autoClose: 1500, hideProgressBar: false});
                setCookie('token', token, {maxAge: 60 * 60 * 24 * 7});
                navi.push('/')
            } else {
                toast.error("Login error!", {autoClose: 1500, hideProgressBar: false});
            }
        } catch (error) {
            toast.error(`${(error as { response?: { statusText: string } })?.response?.statusText}`, { autoClose: 1500, hideProgressBar: false });
        }
    }
    return (
        <>
            <div className="bg-white font-family-karla h-screen">

                <div className="w-full flex flex-wrap">

                    <div className="w-full md:w-1/2 flex flex-col">
                        <div
                            className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                            <p className="text-center text-3xl">Welcome.</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-3 md:pt-8">
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                                    <input
                                        type="email" id="email" placeholder="your@email.com"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        {...register('email', {required: "Không được để trống !!!"})}
                                    />
                                    {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input
                                        type="password" id="password" placeholder="Password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        {...register('password', {required: "Không được để trống !!!"})}
                                    />
                                    {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                                </div>

                                <button type="submit"
                                        className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Log
                                    In
                                </button>
                            </form>
                            <div className="text-center pt-12 pb-12">
                                <p>Dont have an account? <Link href="/signup" className="underline font-semibold">Register
                                    here.</Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="flex w-full h-screen justify-center items-center">
                            <img
                                className="object-cover h-auto hidden md:block"
                                src="https://i0.wp.com/capstonehq.com/wp-content/uploads/2023/04/mission-statement-graphic-2.png?w=500&ssl=1"
                                alt="không có ảnh"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}