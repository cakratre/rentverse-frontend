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


const properties = [
  { title: "Bangkok", count: "1,200 Property", img: "./thumb.png" },
  { title: "Singapore", count: "980 Property", img: "https://images.unsplash.com/photo-1600664356348-10686526af4f?q=80&w=1175&auto=format&fit=crop" },
  { title: "Jakarta", count: "3,500 Property", img: "https://images.unsplash.com/photo-1617687611017-48db8d42fd8f?q=80&w=1170&auto=format&fit=crop" },
  { title: "George Town", count: "1,780 Property", img: "./thumb.png" },
  { title: "Ho Chi Minh City", count: "1,100 Property", img: "https://images.unsplash.com/photo-1543355890-20bc0a26fda1?q=80&w=1173&auto=format&fit=crop" },
  { title: "Kuala Lumpur", count: "2,300 Property", img: "https://images.unsplash.com/photo-1602427384420-71c70e2b2a2f?q=80&w=1106&auto=format&fit=crop" },
  { title: "Manila", count: "950 Property", img: "./thumb.png" },
  { title: "Hanoi", count: "870 Property", img: "https://images.unsplash.com/photo-1617687611017-48db8d42fd8f?q=80&w=1170&auto=format&fit=crop" },
  { title: "Phnom Penh", count: "650 Property", img: "./thumb.png" },
  { title: "Bandung", count: "1,400 Property", img: "./thumb.png" },
];

const Slider = () => {
  // duplikat biar looping mulus
  const duplicated = [...properties, ...properties];

  return (
    <div className="border-t border-black/15 relative overflow-hidden">
      <div className="flex gap-10 animate-scroll px-5 py-10">
        {duplicated.map((property, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-[400px] flex-shrink-0"
          >
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

export default Slider;

