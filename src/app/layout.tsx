import "@styles/globals.css";
import PageLayout from "@components/PageLayout";
import {Provider} from "@/app/provider";
import localFont from "next/font/local";

const pretendard = localFont({
    src: '../assets/fonts/PretendardVariable.woff2',
    display: 'swap',
    variable: '--font-pretendard',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={pretendard.variable}>
        <body>
        <Provider>
            <PageLayout>{children}</PageLayout>
        </Provider>
        </body>
        </html>
    );
}