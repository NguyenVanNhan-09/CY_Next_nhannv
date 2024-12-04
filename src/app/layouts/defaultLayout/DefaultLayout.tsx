import {ReactNode} from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}