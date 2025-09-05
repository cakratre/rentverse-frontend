import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
// import Feature from "@/components/Feature";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Splash tampil 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />; // tampil splash dulu
  }

  return (
    <div className="font-poppins bg-[var(--color-background)]">
      {/* <Navbar /> */}
      <Hero />
      <Slider />
      {/* <Feature /> */}
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
