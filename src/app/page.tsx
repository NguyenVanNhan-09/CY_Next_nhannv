import BannerHeader from "@/app/components/Home/BannerHeader"
import Title from "@/app/components/Home/Title";
import Pricing from "@/app/components/Home/Pricing";
import DefaultLayout from "./layouts/defaultLayout/DefaultLayout"

export default function Home() {
    return (
        <DefaultLayout>
            <div className="leading-normal tracking-normal text-white gradient">
                {/*banner_header*/}
                <BannerHeader/>

                {/*Title*/}
                <Title/>

                {/*Pricing*/}
                <Pricing/>

                {/*Banner_footer*/}
                <BannerHeader/>
            </div>
        </DefaultLayout>

    );
}
