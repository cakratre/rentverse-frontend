import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What is this application about?",
    answer:
      "This application helps you manage your tasks efficiently and stay organized.",
  },
  {
    question: "How can I create an account?",
    answer:
      "You can create an account by clicking on the Sign Up button and filling out the registration form.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes, we use encryption and other security measures to ensure your data is safe.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-[var(--color-text)]/15 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      <div className="flex flex-col lg:flex-row lg:space-x-16 space-y-8 lg:space-y-0">
        {/* Header */}
        <div className="lg:w-1/2">
          <p className="text-xs p-3 text-black/50 border border-black/15 w-fit rounded-full">
            Got Questions?
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              Question
            </span>
          </h1>
          <p className="mt-4 text-black/50 text-sm sm:text-base leading-relaxed">
            RENTVERSE is a property rental platform that makes it simple to
            search, rent, and manage properties. With modern features and a
            user-friendly system, renting becomes easier, more transparent, and
            efficient.
          </p>
        </div>
        {/* FAQ */}
        <div className="lg:w-1/2 space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-black/15 rounded-3xl sm:rounded-4xl overflow-hidden"
            >
              <button
                className="w-full text-left p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 flex justify-between items-start sm:items-center gap-4"
                onClick={() => toggle(index)}
              >
                <span className="text-lg sm:text-xl md:text-2xl leading-relaxed flex-1 pr-2">
                  {item.question}
                </span>
                <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-2 sm:p-3 md:p-4 lg:p-5 text-white rounded-full flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp
                      size={16}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  ) : (
                    <ChevronDown
                      size={16}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-5 bg-[var(--color-background)] border-t border-black/15">
                  <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
