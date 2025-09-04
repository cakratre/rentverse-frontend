import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import Feature from "@/components/Feature";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Slider />
            <Feature />
            <Testimonial />
            <FAQ />
            <Footer />
        </div>
    )
}

export default HomePage;
