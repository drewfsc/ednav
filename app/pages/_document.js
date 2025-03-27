import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html className={"h-full"} lang={`en`}>
            <Head />
            {/*<body className={"h-full bg-white dark:bg-black"}>*/}
            <body className={"h-full bg-white"}>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
