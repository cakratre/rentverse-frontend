import { useEffect, useState } from "react";
import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import Carousel from "@/components/organisms/Carousel";
import Testimonial from "@/components/organisms/Testimonial";
import FAQ from "@/components/organisms/FAQ";
import Footer from "@/components/organisms/Footer";
import SplashPage from "@/components/pages/SplashPage";
import Service from "@/components/organisms/Service";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashPage />;
  }

  return (
    <div className="font-poppins bg-[var(--color-background)]">
      <Navbar />
      <Hero />
      <Carousel />
      <Service />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
