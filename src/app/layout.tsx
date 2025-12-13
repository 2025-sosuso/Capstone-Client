import "@styles/globals.css";
import PageLayout from "@components/PageLayout";
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
            <PageLayout>{children}</PageLayout>
        </Provider>
        </body>
        </html>
    );
}