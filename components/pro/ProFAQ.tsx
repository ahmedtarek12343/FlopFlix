"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What is included in the Pro Plan?",
    answer:
      "The Pro Plan includes ad-free streaming, 4K Ultra HD quality, offline downloads, exclusive content access, and priority customer support.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing period.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a 7-day free trial for all new Pro subscribers. You won't be charged until the trial period ends.",
  },
  {
    question: "How many devices can I stream on?",
    answer:
      "With the Pro Plan, you can stream on up to 4 devices simultaneously.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We do not typically offer refunds for partial subscription periods, but please contact support if you have a specific issue.",
  },
];

const ProFAQ = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProFAQ;
