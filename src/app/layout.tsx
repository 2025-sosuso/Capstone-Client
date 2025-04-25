import "@styles/globals.css";
import LayoutShell from "@components/RootLayout/LayoutShell";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <LayoutShell>{children}</LayoutShell>
        </body>
        </html>
    );
}