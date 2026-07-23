'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, idx: number) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`faq-item ${isOpen ? 'active' : ''}`}
            style={{
              background: 'var(--bg-surface)',
              border: isOpen ? '1px solid var(--logo-electric-cyan)' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '14px',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              onClick={() => toggleFAQ(idx)}
              className="faq-question"
              style={{
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '17px',
                color: 'var(--text-main)'
              }}
            >
              <span>{item.question}</span>
              <span style={{ fontSize: '20px', color: 'var(--logo-royal-blue)', fontWeight: '800' }}>
                {isOpen ? '−' : '+'}
              </span>
            </div>

            {isOpen && (
              <div
                className="faq-answer"
                style={{
                  padding: '0 28px 22px 28px',
                  color: 'var(--text-muted)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
