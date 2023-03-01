import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import SharedLayout from "src/components/layout/SharedLayout";


export default function App({ Component, pageProps }: AppProps) {
    return (
        <SharedLayout>
            <Component {...pageProps} />
        </SharedLayout>
    );
}
