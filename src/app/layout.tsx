import "@styles/globals.css";
import Layout from "@components/layout";
import {Provider} from "@/app/provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Provider>
            <Layout>{children}</Layout>
        </Provider>
        </body>
        </html>
    );
}