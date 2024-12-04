"use client"

import { GetListMyOrder } from "@/app/services/cartService";
import { useEffect, useState } from "react";
import { TOrder } from "@/interface/order";
import DefaultLayout from "@/app/layouts/defaultLayout/DefaultLayout";

const MyOrder = () => {
    const [orders, setOrder] = useState<TOrder[] | null>(null);
    const [isOpen, setIsOpen] = useState<boolean[]>([]); // State cho từng đơn hàng

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await GetListMyOrder();
                if (res) {
                    // Map dữ liệu từ API để phù hợp với TOrder
                    const mappedOrders = res.data.map((order: any) => ({
                        ...order,
                        cart_item: order.order_items.map((item: any) => ({
                            product_id: item?.product_id,
                            quantity: item?.quantity,
                            price: item?.price,
                            name: item?.name,
                        })),
                    }));
                    setOrder(mappedOrders);
                    setIsOpen(new Array(mappedOrders.length).fill(false)); // Khởi tạo trạng thái cho mỗi đơn hàng
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    // Toggle show details for specific order
    const toggleDetails = (index: number) => {
        setIsOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index]; // Đảo ngược trạng thái của đơn hàng tại index
            return newState;
        });
    };

    return (
        <DefaultLayout>
            <div className="max-w-[1220px] mx-auto p-4 my-20">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">My Order</h1>
                {/* Orders List */}
                <div className="space-y-4 mb-6">
                    {orders?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg"
                        >
                            <div className="p-4 cursor-pointer"   onClick={() => toggleDetails(index)}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Order #{item?.id}</h2>
                                        <p className="text-sm text-gray-600">2024-11-24</p>
                                        <div>
                                            Address: <span>{item?.address}</span>
                                        </div>
                                        <div>
                                            Phone: <span>{item?.phone}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div>
                                            Sub total: <span>${item?.sub_total}</span>
                                        </div>
                                        <div>
                                            Tax: <span>${item?.tax}</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-800">${item?.total}</p>
                                        <p className="text-sm text-green-600">{item?.status}</p>
                                    </div>
                                </div>
                                <i className="mt-2">...</i>
                            </div>

                            {/* Order Details */}
                            {isOpen[index] && (
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
                                    <div className="list-disc w-full list-inside">
                                        <div className="flex items-center w-full mb-4">
                                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 min-w-full">
                                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                    <table className="min-w-full leading-normal">
                                                        <thead>
                                                        <tr>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Product
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Quantity
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Price
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Total
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {item?.cart_item?.map((product, index) => (
                                                            <tr key={index}>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap truncate max-w-[200px]">
                                                                        {product?.name}
                                                                    </p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">{product?.quantity}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">${product?.price}</p>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                    <p className="text-gray-900 whitespace-no-wrap">$ {Number(product?.quantity) * Number(product?.price)}</p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default MyOrder;
