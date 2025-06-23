import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I reset my password?",
    answer: 'Use "Password Reset" option in Dashboard to reset your credentials securely.',
  },
  {
    question: "Can I undo a deletion?",
    answer: "No. Deletions are permanent. Always double-check before confirming.",
  },
  {
    question: "Why can't I register users?",
    answer: 'Only "owner" role users have permission to register new users.',
  },
  {
    question: "Where do uploaded images go?",
    answer: 'They are stored in Cloudinary inside the "lando-travels" folder.',
  },
  {
    question: "Can I preview a blog card?",
    answer: "Yes. All saved changes appear instantly below the editor.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">❓ Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-md overflow-hidden bg-white shadow-sm">
            <button aria-label="Button"
              onClick={() => toggle(i)}
              className="w-full text-left cursor-pointer px-4 py-3 flex items-center justify-between hover:bg-gray-100"
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 text-sm text-gray-700 border-t bg-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
