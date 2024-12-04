import instance from "@/Axios";
import {TAuth} from "@/interface/auth";

export const Register = async (formData: TAuth)  => {
    try {
        const res = await instance.post("/v1/signup", formData)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const SignIn = async (formData: TAuth)  => {
    try {
        const res = await instance.post("/v1/login", formData)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const Logout = async ()  => {
    try {
        const res = await instance.post("/v1/logout")
        return res.data
    }catch(err) {
        console.log(err)
    }
}
