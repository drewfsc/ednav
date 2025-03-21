"use client"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    return (
        <div className={``}>
            <div className={`bg-gradient-to-l from-gray-800 to-gray-700 mb-2 rounded shadow-lg p-4 flex items-center justify-between`}>
                <Link href={`/`}><Image className={`w-[40px] h-auto`} src={`/fsc-logo-white.png`} alt={`logo`}
                                        width={647} height={580}/></Link>
                <div className={`text-3xl text-gray-400 ml-6 uppercase font-extralight`}>Ed<span
                    className={`font-bold text-white italic`}>Nav</span><span className={`text-sm`}>success tracker</span>
                </div>
            </div>
            <div className={cn("flex flex-col gap-6 bg-white rounded", className)} {...props}>
                <Card className="overflow-hidden shadow-xl rounded">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8 ">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-left">
                                    <h1 className="font-extralight text-gray-500 uppercase tracking-wide text-2xl w-full">Sign
                                        In</h1>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="username"
                                        placeholder="username"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="text" required/>
                                </div>
                                <button type={`button`} className={`bg-blue-600 text-white rounded px-8 py-2 w-fit`} onClick={(e) => {
                                    e.preventDefault();

                                }}>Log In</button>
                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="/ednavlogin.jpg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
