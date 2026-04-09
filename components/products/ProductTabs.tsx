'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductWithCategories } from '@/lib/types/product';

interface ProductTabsProps {
  product: ProductWithCategories;
}

type TabType = 'description' | 'ingredients' | 'usage' | 'warnings';

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    {
      id: 'description' as TabType,
      label: 'Description',
      content: product.description,
    },
    {
      id: 'ingredients' as TabType,
      label: 'Ingredients',
      content: product.ingredients,
    },
    {
      id: 'usage' as TabType,
      label: 'How to Use',
      content: product.usageInstructions,
    },
    {
      id: 'warnings' as TabType,
      label: 'Warnings',
      content: getWarningContent(),
    },
  ].filter((tab) => tab.content); // Only show tabs with content

  function getWarningContent() {
    return `
**Important Health Information**

• This product contains nicotine, which is a highly addictive substance
• This product is intended for adult use only (18+ years)
• Not for use by non-smokers, pregnant or breastfeeding women
• Keep out of reach of children and pets
• Do not use if you have cardiovascular disease or diabetes
• Consult your doctor before use if you have any medical conditions
• Store in a cool, dry place away from direct sunlight

**Age Verification Required**

All purchases require age verification. You must be 18 years or older to purchase this product.

**Responsible Use**

PUXX Ireland promotes responsible nicotine pouch usage. Please use this product as directed and dispose of pouches responsibly.
    `.trim();
  }

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      {/* Desktop Tabs */}
      <div className="hidden sm:block border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Tab Content */}
      <div className="hidden sm:block py-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            <div className="prose prose-lg max-w-none">
              {formatContent(tab.content || '')}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Accordion */}
      <div className="sm:hidden space-y-2">
        {tabs.map((tab) => (
          <Accordion
            key={tab.id}
            title={tab.label}
            content={tab.content || ''}
            isOpen={activeTab === tab.id}
            onToggle={() =>
              setActiveTab(activeTab === tab.id ? 'description' : tab.id)
            }
          />
        ))}
      </div>
    </div>
  );
}

interface AccordionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

function Accordion({ title, content, isOpen, onToggle }: AccordionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          <div className="prose prose-sm max-w-none">
            {formatContent(content)}
          </div>
        </div>
      )}
    </div>
  );
}

function formatContent(content: string) {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter((p) => p.trim());

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph starts with **heading** (markdown-style bold)
        if (paragraph.startsWith('**') && paragraph.includes('**')) {
          const parts = paragraph.split('**');
          return (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {parts[1]}
              </h3>
              {parts[2] && (
                <p className="text-gray-700 leading-relaxed">{parts[2].trim()}</p>
              )}
            </div>
          );
        }

        // Check if paragraph contains bullet points
        if (paragraph.includes('•') || paragraph.includes('-')) {
          const items = paragraph
            .split('\n')
            .filter((item) => item.trim())
            .map((item) => item.replace(/^[•\-]\s*/, '').trim());

          return (
            <ul key={index} className="list-disc list-inside space-y-2 text-gray-700">
              {items.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
