import Button from "@/components/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <div className="pt-32 flex justify-start items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-[var(--color-background)] relative">
            
            {/* Hero Content */}
            <div className="z-10 pb-16 pt-16 flex flex-col w-full max-w-[610px] gap-6 sm:gap-8 md:gap-10">

                {/* Headline */}
                <h1 className="text-[var(--color-text)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-none font-poppins">
                    Easy Rentals, Peaceful Living
                </h1>

                {/* Sub Headline */}
                <p className="text-[var(--color-text)]/50 text-base sm:text-lg max-w-none sm:max-w-[500px] md:max-w-[550px]">
                    Finding the right place to live shouldn't be stressful. With our platform, you can explore a wide range of properties — from modern apartments to spacious family homes — all designed to fit your lifestyle and budget.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button text="Login" icon={ArrowRight} variant="elevated" to="/auth/login" />
                    <Button text="Create Account" icon={ArrowRight} variant="outline" to="/auth/register" />
                </div>
                
            </div>
            
            {/* Hero Image */}
            <div className="hidden md:block absolute right-0 top-0 w-1/2 lg:w-auto h-full">
                <img 
                    className="h-full w-auto object-cover object-left min-w-[500px] lg:min-w-[600px]" 
                    src="./hero.png" 
                    alt="Hero" 
                />
            </div>
        </div>
    )
}

export default Hero;
