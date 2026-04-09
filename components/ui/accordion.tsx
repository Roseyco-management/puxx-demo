'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 px-6 text-left font-medium hover:bg-muted/50 transition-all group"
      >
        <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors pr-8">
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground group-hover:text-primary'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultOpenIndex, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
