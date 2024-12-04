import instance from "@/Axios";

export const GetProducts = async () => {
    try {
        const res = await instance.get("/v1/products");
        return res;
    }catch (error){
        console.error(error)
    }
}

export const GetProductById = async (id: string | number) => {
    try{
        const {data} = await instance.get(`/v1/products/${id}}`);
        return data
    }catch(err){
        console.error(err)
    }
}