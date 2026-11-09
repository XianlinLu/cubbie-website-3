'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const questions = [
  {
    question: 'What is Cubbie?',
    answer: 'Cubbie is an AI school assistant and student planner you text. It connects to Canvas and Google to keep track of assignments, email and your calendar, and helps you work through coursework.',
  },
  {
    question: 'Is Cubbie a homework answer generator?',
    answer: 'No. Cubbie explains course material and helps you plan and review your work. You check what it writes, follow your instructor’s rules about AI and submit your own work.',
  },
  {
    question: 'Does Cubbie work with Canvas?',
    answer: 'Yes. Connect Canvas with the Cubbie Chrome extension, or at supported schools through a one-time secure sign-in link. Cubbie syncs your courses, assignments, grades, announcements and files.',
  },
  {
    question: 'Can Cubbie send email or change my calendar on its own?',
    answer: 'Cubbie acts when you ask. It shows you an email and asks before sending it, and checks with you before changing an event other people are invited to.',
  },
  {
    question: 'Does Cubbie work on Android?',
    answer: 'Yes. iPhones reach Cubbie over iMessage and Android phones over RCS, using the same number.',
  },
  {
    question: 'Is Cubbie always accurate?',
    answer: 'No. AI output and synced data can be incomplete, out of date or wrong. Check important dates, grades, instructions and course content against the original source.',
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={`section-shell ${styles.layout}`}>
        <h2 className={styles.heading} id="faq-heading">Questions<br />students ask</h2>
        <div className={styles.questions}>
          {questions.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={styles.item} key={question} data-open={isOpen}>
                <h3 className={styles.questionHeading}>
                  <button
                    type="button"
                    className={styles.trigger}
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{question}</span>
                    <span className={styles.plus} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className={styles.answer}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
