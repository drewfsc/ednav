"use client"
import React from 'react';
import Link from "next/link";

export default function ENButton({ label, onClick, kind, href }) {
    const styleClass = (() => {
        switch (kind) {
            case 'navigators':
                return 'bg-blue-600 hover:bg-blue-500';
            case 'clients':
                return 'bg-blue-600 hover:bg-blue-500';
            case 'feps':
                return 'bg-blue-600 hover:bg-blue-500';
            case 'primary':
                return 'bg-blue-800 hover:bg-blue-700 border border-blue-500 bg-opacity-30 rounded-full';
            case 'login':
                return 'bg-blue-600 hover:bg-blue-500 text-center';
            default:
                return '';
        }
    })();

    if(href !== ""){
        return (
            <Link href={href}
                  className={`h-auto px-6 py-2 rounded ml-3 font-extralight text-[12px] cursor-pointer transition duration-400 ease-in-out  text-white ${styleClass} ${href === kind.toLowerCase() ? 'border border-amber-500' : ''}`} onClick={onClick}>
                <div>{label}</div>
            </Link>
        );
    }else{
        return (
            <div onClick={onClick} className={`h-auto px-6 py-2 rounded ml-3 font-extralight text-[12px] cursor-pointer transition duration-400 ease-in-out  ${styleClass}`}>
                <div>{label}</div>
            </div>
        );
    }
}
