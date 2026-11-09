"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/assets";
import styles from "./WeeklyPlanner.module.css";

const week = [
  {
    day: "Monday",
    description: "Check upcoming assignments and anything that changed.",
  },
  { day: "Tuesday", description: "Break a large assignment into milestones." },
  {
    day: "Wednesday",
    description:
      "Find your professor’s latest email and the course file it mentions.",
  },
  { day: "Thursday", description: "Look at what’s left and adjust the plan." },
  {
    day: "Friday",
    description: "Check what’s done, missing and coming up before the weekend.",
  },
] as const;

export function WeeklyPlanner() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % week.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + week.length) % week.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = week.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="week" className={styles.section} aria-labelledby="week-title">
      <div className={`section-shell ${styles.shell}`}>
        <h2 id="week-title" className={styles.heading}>
          From scattered updates to a workable week
        </h2>
        <div className={styles.tabs} role="tablist" aria-label="School week">
          {week.map(({ day }, index) => (
            <button
              key={day}
              type="button"
              ref={(element) => {
                tabs.current[index] = element;
              }}
              className={styles.tab}
              id={`week-tab-${index}`}
              role="tab"
              aria-selected={selected === index}
              aria-controls={`week-panel-${index}`}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className={styles.tabNumber} aria-hidden="true">
                0{index + 1}
              </span>
              {day}
            </button>
          ))}
        </div>
        <div className={styles.panelFrame}>
          {week.map(({ day, description }, index) => (
            <div
              key={day}
              className={styles.panel}
              role="tabpanel"
              id={`week-panel-${index}`}
              aria-labelledby={`week-tab-${index}`}
              hidden={selected !== index}
              tabIndex={0}
            >
              <div className={styles.copy}>
                <p className={styles.counter}>
                  <span>{index + 1}</span>
                  <span className={styles.counterTotal}> / 5</span>
                </p>
                <h3>{day}</h3>
                <p className={styles.description}>{description}</p>
                <span className={styles.dayMark} aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className={styles.artwork}>
                <img
                  src={asset("/images/cubbie-blue.png")}
                  alt="Cubbie character in a blue outfit, resting on one hand"
                  width={2048}
                  height={1106}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.action}>
          <a className="button" href="https://cubbie.ai/use-cases">
            Explore use cases <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
