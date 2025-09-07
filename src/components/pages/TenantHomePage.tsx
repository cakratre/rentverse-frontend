import PropertyList from "@/components/organisms/PropertyList";

const TenantHomePage = () => {
    return (
        <div className="mx-32 bg-[var(--color-background)] border border-[var(--color-border)] min-h-screen">
            <h1>Find property best for you.</h1>

            <div className="flex">
                <input type="text" className="p-5 border border-black/15 rounded-full w-full" />
                <button className="w-[20%] p-5 bg-blue-500 rounded-full">Search</button>
            </div>
            <div className="flex gap-1 mt-1">
                <button className="p-3 bg-blue-500 rounded-full"><span className="text-xs">Apartement</span></button>
                <button className="p-3 bg-blue-500 rounded-full"><span className="text-xs">Apartement</span></button>
                <button className="p-3 bg-blue-500 rounded-full"><span className="text-xs">Apartement</span></button>
            </div>

            <PropertyList />
        </div>
    )
}

export default TenantHomePage;