import React from "react";
import DefaultLayout from "@/app/layouts/defaultLayout/DefaultLayout";
import {GetProducts} from "@/app/services/productsService";
import {TProduct} from "@/interface/products";
import ItemProduct from "@/app/components/Products/ItemProduct";


export default async function Products() {
    let products = []
    try {
        const res = await GetProducts();
        products = res?.data?.data || [];
    }catch(error){
        console.log(error);
    }
    return (
        <DefaultLayout>
            <div className="text-center p-10">
                <h1 className="font-bold text-4xl mb-4">Responsive Product card grid</h1>
                <h1 className="text-3xl">Tailwind CSS</h1>
            </div>
            <section id="Projects"
                     className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {products.map((product:TProduct, index: number) => (
                    <ItemProduct key={index} product={product} />
                ))}
            </section>
        </DefaultLayout>
    )
}
