'use client';

import {useEffect, useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import {getCookie, deleteCookie} from "cookies-next"
import useCartStore from "@/app/stores/cartStore";
import {Logout} from "@/app/services/authService";
import {useRouter} from "next/navigation";

export default function Header() {
    const [token, setToken] = useState<string | null>(null);
    const navi = useRouter()
    useEffect(() => {
        const tokenFromCookie = getCookie('token');
        setToken(tokenFromCookie ? tokenFromCookie : null);
    }, []); // Chạy chỉ 1 lần khi component mount


    const [open, setOpen] = useState(false)
    const {items, removeFromCart, total} = useCartStore()

    const HandleLogout = async () => {
        try {
            await Logout()
            deleteCookie("token")
            navi.push("/login")
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <nav id="header" className="fixed z-20 w-full top-0 text-white bg-white">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                    <div className="pl-4 flex items-center">
                        <Link
                            className="toggleColour text-gray-500 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                            href="/">
                            <svg className="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512.005 512.005">
                                <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502"
                                      transform="matrix(1,0,0,1,0,0)"/>
                                <path
                                    className="plane-take-off"
                                    d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
                                />
                            </svg>
                            NEXT JS
                        </Link>
                    </div>
                    <div className="block lg:hidden pr-4">
                        <button id="nav-toggle"
                                className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    {token ?
                        <>
                            <div
                                className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-white text-black p-4 lg:p-0 z-20"
                                id="nav-content">
                                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                                    <li className="mr-3">
                                        <Link href={"/orders"}
                                              className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                        >Orders</Link>
                                    </li>
                                    <li className="mr-3">
                                        <button onClick={() => setOpen(true)}
                                                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                        >Cart
                                        </button>
                                    </li>
                                    <li className="mr-3">
                                        <button onClick={() => HandleLogout()}
                                            className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                        >Logout
                                        </button>
                                    </li>
                                    <li className="mr-3">
                                        <div
                                            className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                                        >Nhân
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <Link href="/register">
                                    <button
                                        id="navAction"
                                        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-3 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                                    >
                                        Register
                                    </button>
                                </Link>
                                <Link href="/login">
                                    <button
                                        id="navAction"
                                        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-3 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </>}
                </div>
                <hr className="border-b border-gray-100 opacity-25 my-0 py-0"/>
            </nav>

            <Dialog open={open} onClose={setOpen} className="relative z-30">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-lg font-medium text-gray-900">Shopping
                                                cart</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="absolute -inset-0.5"/>
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {items.map((product) => (
                                                        <li key={product.id} className="flex py-6">
                                                            <div
                                                                className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img src={product?.preview_img_path}
                                                                     className="size-full object-cover"/>
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div
                                                                        className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3 className="line-clamp-1">
                                                                            {product.name}
                                                                        </h3>
                                                                        <p className="ml-4">${product.price}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">color</p>
                                                                </div>
                                                                <div
                                                                    className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                                                    <div className="flex">
                                                                        <button
                                                                            onClick={() => removeFromCart(product.id as number)}
                                                                            type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${total}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <div className="mt-6">
                                            <Link
                                                href="/checkout"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}