import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";

export default function Home() {
    return (
        <div className="flex h-screen bg-white">
            <div className="w-7/12 text-cyan-100 flex flex-col justify-center items-center">
                <span className="text-center text-7xl font-bold rounded-full py-10 px-20 border-dotted border-8 border-cyan-100 w-fit flex flex-col">
                    <span>Welcome to</span>
                    <span>FA-Guardix</span>
                </span>
            </div>
            <div className="bg-cyan-100 text-black w-5/12">
                <div className="flex flex-col gap-12 justify-center items-center h-full">
                    <span className="text-4xl text-white">Login</span>
                    <div className="flex flex-col gap-2 w-full items-center mb-24">
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"text"}
                            placeholder="username"
                        />
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"password"}
                            placeholder="password"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
