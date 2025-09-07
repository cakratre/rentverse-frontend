import { useEffect, useState } from "react";


const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <div className="font-poppins bg-[var(--color-background)]">
      <Navbar />
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
