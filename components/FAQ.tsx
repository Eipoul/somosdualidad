"use client";

import { useState } from "react";
import { siteContent } from "@/content/site";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {siteContent.faq.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-accentDark/15 bg-white/60">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium">{item.question}</span>
                <span aria-hidden="true" className="text-xl">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={isOpen ? "px-5 pb-4" : "hidden"}
            >
              <p className="text-sm text-foreground/75">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
