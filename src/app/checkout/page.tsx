"use client"

import DefaultLayout from "@/app/layouts/defaultLayout/DefaultLayout";
import useCartStore from "@/app/stores/cartStore";
import {useForm} from "react-hook-form";
import {Order} from "@/app/services/cartService";
import {toast} from "react-toastify"
import {useRouter} from "next/navigation";

type TInfo = {
    address: string;
    phone: string;
}

export default function Page() {
    const navi = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<TInfo>()
    const {items, removeFromCart, increaseQuantity, decreaseQuantity , clearCart} = useCartStore()

    const onSubmit = async (info: TInfo) => {
        console.log(items)
        const myOrder = {
            ...info,
            cart_item: items.map((item) => {
                return {
                    "product_id": item?.id,
                    "quantity": item?.quantity,
                    "price": item?.price,
                    "name": item?.name
                }
            })
        }

        try {
            const res = await Order(myOrder);
            if (res?.status === 200 || res?.status === 201) {
                clearCart()
                toast.success("Order placed successfully!");
                navi.push("/orders")
            } else {
                toast.error(`Order failed: ${res?.data?.message || "Unexpected error"}`);
            }
        } catch (error) {
            console.error("Error occurred during the order process:", error);
        }
    }

    return (
        <DefaultLayout>
            <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4 my-20">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Checkout</h1>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="md:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <div key={index}
                                 className="grid grid-cols-3 items-start gap-4 border-b pb-3.5 border-gray-300">

                                <div className="col-span-2 flex items-start gap-4">
                                    <div
                                        className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                                        <img src={item?.preview_img_path} className="w-full h-full object-contain"
                                             alt="Product"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="text-base font-bold text-gray-800 truncate w-full max-w-[220px]">{item?.name}</h3>
                                        <p className="text-xs font-semibold text-gray-500 mt-0.5">Size: MD</p>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (item?.id) {
                                                    removeFromCart(item?.id)
                                                }
                                            }}
                                            className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                />
                                                <path
                                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"/>
                                            </svg>
                                            REMOVE
                                        </button>
                                    </div>
                                </div>

                                <div className="ml-auto">
                                    <h4 className="text-lg max-sm:text-base font-bold text-gray-800">$ {item?.price}</h4>

                                    <div
                                        className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                        <button
                                            onClick={() => {
                                                if (item) {
                                                    decreaseQuantity(item?.id as number)
                                                }
                                            }
                                            }
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current"
                                                 viewBox="0 0 124 124">
                                                <path
                                                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"/>
                                            </svg>
                                        </button>

                                        <span className="mx-3 font-bold">{item?.quantity} </span>

                                        <button
                                            onClick={() => {
                                                if (item) {
                                                    increaseQuantity(item?.id as number)
                                                }
                                            }
                                            }
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current"
                                                 viewBox="0 0 42 42">
                                                <path
                                                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 rounded-md p-4 h-max">
                        <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order
                            Summary</h3>
                        <div className="mt-6">
                            <h3 className="text-base text-gray-800 font-semibold mb-4">Enter Details</h3>
                            <div className="space-y-3">
                                <div className="relative flex items-center">
                                    <input
                                        {...register("address", {required: "Vui lòng nhập địa chỉ !!!"})}
                                        type="text"
                                        placeholder="Address"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                </div>
                                {errors.address && <span className="text-red-500">{errors.address.message}</span>}

                                <div className="relative flex items-center">
                                    <input
                                        {...register("phone", {required: "Vui lòng nhập phone!!!"})}
                                        type="number"
                                        placeholder="Phone No."
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                </div>
                                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                            </div>
                        </div>

                        <ul className="text-gray-800 mt-6 space-y-3">
                            <li className="flex flex-wrap gap-4 text-sm">
                                Subtotal <span className="ml-auto font-bold">totalPrice</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">Shipping <span
                                className="ml-auto font-bold">free</span></li>
                            <li className="flex flex-wrap gap-4 text-sm">Tax <span
                                className="ml-auto font-bold">free</span>
                            </li>
                            <hr className="border-gray-300"/>
                            <li className="flex flex-wrap gap-4 text-sm font-bold">
                                Total <span className="ml-auto">totalPrice</span>
                            </li>
                        </ul>

                        <div className="mt-6 space-y-3">
                            <button
                                type="submit"
                                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide gradient text-white border border-gray-300 rounded-md"
                            >
                                Checkout
                            </button>
                            <button
                                type="button"
                                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}