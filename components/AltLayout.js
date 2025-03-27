import React from 'react'

export default function AltLayout({ children }) {
    return (
        <div className={`h-full w-full bg-zinc-600`}>
            <main>{children}</main>
        </div>
    )
}
