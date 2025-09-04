const Hero = () => {
    return (
        <div className="flex justify-start pl-44 min-h-screen bg-[var(--color-background)]">
            <div className="flex flex-col w-[610px]">
                <h1 className="text-[var(--color-text)] text-8xl">Easy Rentals, Peaceful Living</h1>
                <p>Finding the right place to live shouldn’t be stressful. With our platform, you can explore a wide range of properties — from modern apartments to spacious family homes — all designed to fit your lifestyle and budget.</p>
            </div>
            <img className="absolute right-0 top-0" src="./hero.png" alt="Hero" />
        </div>
    )
}

export default Hero;
