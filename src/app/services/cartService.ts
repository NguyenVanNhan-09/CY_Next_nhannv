
import instance from "@/Axios";
import {TOrder} from "@/interface/order";
export const Order = async (order: TOrder) => {
    try {
        const res = await instance.post("/v1/order", order);
        return res
    }catch (error){
        console.log(error)
    }
}

export const GetListMyOrder = async () => {
    try{
        const res = await instance.get("/v1/orders")
        return res
    }catch(err) {
        console.log(err)
    }
}
