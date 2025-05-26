export default function SectionLayout({header, children}: {header:string, children: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold ">{header}</h1>
            {children}
        </div>
    )
}