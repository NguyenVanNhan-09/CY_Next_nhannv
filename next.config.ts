import type {NextConfig} from "next";
import {routes} from "./routes";

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return routes
    },
    reactStrictMode: false
};

export default nextConfig;
