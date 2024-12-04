'use client'

import DefaultLayout from "@/app/layouts/defaultLayout/DefaultLayout";
import {useParams, useRouter} from 'next/navigation'
import {useEffect, useState} from "react";
import {GetProductById} from "@/app/services/productsService";
import { TProduct} from "@/interface/products";
import useCartStore from "@/app/stores/cartStore";

export default function Detail() {
    const navi = useRouter()
    const params = useParams<{ id: string }>();
    const [product, setProduct] = useState<TProduct | null>(null)
    const [qtyProduct, setQtyProduct] = useState<number>(1)
    const id = params.id;
    const {addToCart} = useCartStore()
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await GetProductById(id)
            setProduct(res)
        }
        fetchProduct()
    }, [id]);
    const handleAddToCart = (product: TProduct) => {
        addToCart({
            ...product,
            quantity: qtyProduct,
        });
    }
    return (
        <DefaultLayout>
            <div className="font-sans tracking-wide max-w-7xl mx-auto block my-20">
                <div className="bg-white md:min-h-[600px] grid items-start grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="h-full">
                        <div className="p-4 relative h-full flex items-center justify-center">
                            <img src={product?.preview_img_path} alt="Product"
                                 className="lg:w-4/5 w-full h-full rounded-xl object-contain"/>
                        </div>
                    </div>

                    <div className="gradient py-6 px-8 h-full">
                        <div>
                            <h2 className="text-3xl font-semibold text-white">{product?.name}</h2>
                            <p className="text-sm text-gray-400 mt-2">{product?.category?.name}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-between mt-8">
                            <h3 className="text-white text-4xl">$ {product?.price}</h3>

                            <div className="flex space-x-2">
                                <svg className="w-5 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                </svg>
                                <svg className="w-5 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                </svg>
                                <svg className="w-5 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                </svg>
                                <svg className="w-5 fill-[#facc15]" viewBox="0 0 14 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                </svg>
                                <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                </svg>
                            </div>
                        </div>

                        <div>
                            <ul className="grid grid-cols-3 mt-8">
                                <li
                                    className="text-white text-base w-full py-3.5 px-2 text-center border-b-2 border-white cursor-pointer">
                                    Description
                                </li>
                                <li
                                    className="text-gray-300 text-base w-full py-3.5 px-2 text-center border-b-2 border-gray-400 cursor-pointer">
                                    Details
                                </li>
                                <li
                                    className="text-gray-300 text-base w-full py-3.5 px-2 text-center border-b-2 border-gray-400 cursor-pointer">
                                    Reviews
                                </li>
                            </ul>
                            <p className="text-gray-300 mt-4 text-base">{product?.description}</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-white">Quantity</h3>

                            <div className="flex mt-4 rounded-full overflow-hidden bg-gray-800 py-2.5 px-4 w-32">
                                <button
                                    onClick={() => setQtyProduct((prev) => Math.max(1, prev - 1))}
                                    type="button"
                                    className="bg-transparent w-full text-white font-semibold flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline"
                                         viewBox="0 0 124 124">
                                        <path
                                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                            data-original="#000000"></path>
                                    </svg>
                                </button>
                                <span
                                    className="bg-transparent w-full px-4 font-semibold flex items-center justify-center text-white text-base">
                                    {qtyProduct}
                                </span>
                                <button
                                    onClick={() => setQtyProduct((prev) => Math.max(1, prev + 1))}
                                    type="button"
                                    className="bg-transparent w-full text-white font-semibold flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline"
                                         viewBox="0 0 42 42">
                                        <path
                                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                            data-original="#000000"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                    onClick={() => {
                                        if(product) {
                                            handleAddToCart(product)
                                            navi.push('/checkout')
                                        }
                                    }}
                                    type="button"
                                    className="min-w-[200px] px-4 py-3.5 bg-gray-800 hover:bg-gray-900 text-white text-base rounded">Buy
                                now
                            </button>
                            <button onClick={() => {
                                if (product) {
                                    handleAddToCart(product)
                                }
                            }} type="button"
                                    className="min-w-[200px] px-4 py-3.5 border border-gray-800 bg-transparent text-white text-base rounded">Add
                                to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}