"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <motion.svg
                        width="150"
                        height="150"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ yoyo: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                        {/* Enveloppe */}
                        <motion.path
                            d="M2 6L12 13L22 6"
                            stroke="#00a455"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <motion.rect
                            x="2"
                            y="6"
                            width="20"
                            height="12"
                            stroke="#00a455"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <motion.polyline
                            points="2,6 12,13 22,6"
                            stroke="#00a455"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />
                    </motion.svg>
                </motion.div>

                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Veuillez vérifier votre boîte mail pour activer votre compte
                </h1>

                <Link href="/auth/login">
                    <Button
                        variant="outline"
                        className="w-full border-[#00a455] text-[#00a455] hover:bg-[#00a455] hover:text-white"
                    >
                        Se connecter
                    </Button>
                </Link>
            </div>
        </div>
    );
}
