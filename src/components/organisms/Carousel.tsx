const properties = [
  {
    title: "George Town (Heritage Zone)",
    count: "Prime Heritage Properties",
    img: "https://images.unsplash.com/photo-1579962738895-c26093956e8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Gurney Drive",
    count: "Millionaire’s Row Condos",
    img: "https://plus.unsplash.com/premium_photo-1743575811753-93e389aab342?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Bayan Lepas",
    count: "High Search Volume—FTZ & Airport",
    img: "https://images.unsplash.com/photo-1651804079709-383b9224c541?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tanjong Tokong",
    count: "Fast-Growing Mixed-Use",
    img: "https://images.unsplash.com/photo-1717817252745-f74857a64800?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Batu Ferringhi",
    count: "Beachfront Villas & Resorts",
    img: "https://plus.unsplash.com/premium_photo-1676487748067-4da1e9afa701?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Jelutong",
    count: "Hot Flat & Apartment Market",
    img: "https://images.unsplash.com/photo-1610978295753-7b1b755f6de8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Bukit Mertajam",
    count: "Top Terrace House Transactions",
    img: "https://images.unsplash.com/photo-1655500025272-5e9246e62716?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Balik Pulau",
    count: "Budget-Friendly Townhouses",
    img: "https://plus.unsplash.com/premium_photo-1700955306493-8fa2c1a4ef8d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Batu Kawan (Bandar Cassia)",
    count: "Satellite Town Growth",
    img: "https://plus.unsplash.com/premium_photo-1743575811753-93e389aab342?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Pulau Tikus / Minden Heights",
    count: "Elite Suburban Homes",
    img: "./thumb.png",
  },
];

const Carousel = () => {
  const duplicated = [...properties, ...properties];

  return (
    <div className="border-t border-black/15 relative overflow-hidden">
      {/* Horizontal Scroll Container */}
      <div className="flex gap-10 animate-scroll px-5 py-10">
        {duplicated.map((property, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-[400px] flex-shrink-0"
          >
            {/* Card */}
            <img
              className="rounded-3xl w-full h-[360px] object-cover"
              src={property.img}
              alt={property.title}
            />
            <h1 className="mt-2 font-semibold">{property.title}</h1>
            <p className="text-gray-500">{property.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

// import { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const properties = [
//     { title: "Bangkok", count: "1,200 Property", img: "./thumb.png" },
//     { title: "Singapore", count: "980 Property", img: "https://images.unsplash.com/photo-1600664356348-10686526af4f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "Jakarta", count: "3,500 Property", img: "https://images.unsplash.com/photo-1617687611017-48db8d42fd8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "George Town", count: "1,780 Property", img: "./thumb.png" },
//     { title: "Ho Chi Minh City", count: "1,100 Property", img: "https://images.unsplash.com/photo-1543355890-20bc0a26fda1?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "Kuala Lumpur", count: "2,300 Property", img: "https://images.unsplash.com/photo-1602427384420-71c70e2b2a2f?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//   { title: "Manila", count: "950 Property", img: "./thumb.png" },
//   { title: "Hanoi", count: "870 Property", img: "https://images.unsplash.com/photo-1617687611017-48db8d42fd8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//   { title: "Phnom Penh", count: "650 Property", img: "./thumb.png" },
//   { title: "Bandung", count: "1,400 Property", img: "./thumb.png" },
// ];

// const Slider = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
//       scrollRef.current.scrollTo({
//         left: scrollLeft + scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="relative">

//       {/* Scroll container */}
//       <div
//         ref={scrollRef}
//         className="flex gap-10 px-5 py-15 overflow-x-auto scrollbar-hide"
//       >
//         {properties.map((property, index) => (
//           <div
//             key={index}
//             className="flex flex-col justify-center items-center w-[400px] flex-shrink-0"
//           >
//             <img
//               className="rounded-3xl w-full h-[360px] object-cover"
//               src={property.img}
//               alt={property.title}
//             />
//             <h1 className="mt-2 font-semibold">{property.title}</h1>
//             <p className="text-gray-500">{property.count}</p>
//           </div>
//         ))}
//       </div>

//       {/* Left Button */}
//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 p-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg hover:opacity-90 transition z-10"
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </button>

//       {/* Right Button */}
//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 p-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg hover:opacity-90 transition z-10"
//       >
//         <ChevronRight className="w-5 h-5" />
//       </button>

//     </div>
//   );
// };

// export default Slider;
