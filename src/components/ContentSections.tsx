"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  CalendarDays,
  Bell,
  MessagesSquare,
  Plug,
  MessageCircle,
  Search,
  Check,
  ShieldCheck,
  LockKeyhole,
  Plus,
  BookOpen,
  FileText,
  ClipboardList,
} from "lucide-react";
import { asset } from "@/lib/assets";
import { admin, coursework, process, control, prompts } from "@/lib/content";
import styles from "./ContentSections.module.css";
export function Problem() {
  return (
    <section className={styles.problem} id="problem">
      <div className="section-shell">
        <p className="eyebrow">Your schoolwork, connected</p>
        <div className={styles.problemGrid}>
          <h2>Schoolwork shouldn’t live in five different places</h2>
          <div>
            <p>
              An assignment is posted in Canvas. A professor moves the due date
              in an announcement. A group update arrives by email. Your study
              plan sits in another calendar. By the time you’ve pieced it
              together, the actual work hasn’t started.
            </p>
            <p>
              Cubbie cuts down that switching. It brings the school accounts you
              connect into one student planner you text, so you can see the
              task, understand it and decide what to do next.
            </p>
            <div
              className={styles.connections}
              aria-label="Canvas, Google, and your calendar"
            >
              <span>Canvas</span>
              <Plus size={16} />
              <span>Google</span>
              <ArrowRight size={16} />
              <img
                src={asset("/images/cubbie-logo.png")}
                alt="Cubbie"
                width="2109"
                height="745"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function CanvasSection({ onWatch }: { onWatch: () => void }) {
  const [selected, setSelected] = useState(0);
  return (
    <section className={styles.canvas} id="canvas">
      <div className={`section-shell ${styles.twoColumn}`}>
        <div className="section-heading">
          <p className="eyebrow">Canvas</p>
          <h2>Turn Canvas into a clearer plan</h2>
          <p>
            Connect Canvas and Cubbie syncs your courses, assignments and
            quizzes, grades, announcements and course files. Check what’s due
            without opening every course one by one.
          </p>
          <a className="button" href="https://cubbie.ai/integrations/canvas">
            Explore the Canvas integration
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className={styles.canvasPanel}>
          <div className={styles.canvasWorkspace}>
            <div className={styles.canvasWorkspaceHeading}>
              <span className={styles.canvasIcon}>
                <BookOpen size={28} strokeWidth={1.4} />
              </span>
              <div>
                <p className="eyebrow">Canvas</p>
                <h3>Your schoolwork, connected</h3>
              </div>
            </div>
            <div className={styles.canvasSources}>
              <span>
                <ClipboardList size={18} />
                Assignments
              </span>
              <span>
                <FileText size={18} />
                Course files
              </span>
              <span>
                <CalendarDays size={18} />
                Due dates
              </span>
            </div>
          </div>
          <div className={styles.promptList}>
            <p className="eyebrow">Text Cubbie</p>
            {prompts.map((prompt, i) => (
              <button
                key={prompt}
                className={selected === i ? styles.selected : ""}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                {prompt}
                <ArrowUpRight size={15} />
              </button>
            ))}
            <button className={styles.promptCta} onClick={onWatch}>
              See how it works
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function CourseworkSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={styles.coursework} id="coursework">
      <div className="section-shell">
        <div className={styles.courseTitle}>
          <h2>Get unstuck without giving up control of the work</h2>
        </div>
        <div className={styles.courseGrid}>
          <div>
            <p className={styles.courseIntro}>
              Cubbie explains course material, clarifies an assignment prompt,
              suggests a task breakdown you can edit and helps you plan your
              research. It doesn’t replace you. It makes the next step easier to
              see.
            </p>
            <div className={styles.steps}>
              {coursework.map(([title, description], i) => (
                <div key={title} className={styles.step}>
                  <button
                    aria-expanded={open === i}
                    aria-controls={`course-step-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className={styles.stepNumber}>0{i + 1}</span>
                    <span>{title}</span>
                    <Plus
                      size={17}
                      className={open === i ? styles.rotated : ""}
                    />
                  </button>
                  <div
                    id={`course-step-${i}`}
                    className={`${styles.stepBody} ${open === i ? styles.open : ""}`}
                    aria-hidden={open !== i}
                  >
                    <div>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              className="button"
              href="https://cubbie.ai/features/coursework-help"
            >
              Explore coursework help
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className={styles.processCard}>
            <p>Your schoolwork, connected</p>
            <h3>
              Connect.
              <br />
              Ask. Review.
              <br />
              Act.
            </h3>
            <ol className={styles.processOrbit} aria-label="How Cubbie works">
              {process.map(([title], i) => {
                const Icon = processIcons[i];
                return (
                  <li key={title}>
                    <span className={styles.orbitIcon}>
                      <Icon size={25} strokeWidth={1.4} />
                    </span>
                    <span>{title}</span>
                  </li>
                );
              })}
            </ol>
            <a className="button white" href="#how-it-works">
              See how it works
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
const adminIcons = [Mail, MessagesSquare, CalendarDays, Bell];
export function AdminSection() {
  return (
    <section className={styles.admin} id="email-calendar">
      <div className="section-shell">
        <div className={styles.adminHeading}>
          <h2>Keep school admin from taking over your day</h2>
          <p>
            Coursework isn’t only in Canvas. Important dates and requests also
            arrive by email, in shared documents and on your calendar. Connect
            Google and Cubbie can help you:
          </p>
        </div>
        <div className={styles.adminGrid}>
          {admin.map(([title, text], i) => {
            const Icon = adminIcons[i];
            return (
              <article key={title}>
                <span className="icon-circle">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className={styles.adminIndex}>0{i + 1}</span>
              </article>
            );
          })}
        </div>
        <a className="button" href="https://cubbie.ai/integrations">
          See every integration
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
const processIcons = [Plug, MessageCircle, Search, Check];
export function HowItWorks() {
  return (
    <section className={styles.how} id="how-it-works">
      <div className="section-shell">
        <p className="eyebrow">See how it works</p>
        <h2>
          Connect. Ask.
          <br />
          Review. Act.
        </h2>
        <ol className={styles.processGrid}>
          {process.map(([title, text], i) => {
            const Icon = processIcons[i];
            return (
              <li key={title}>
                <div className={styles.processTop}>
                  <span>0{i + 1}</span>
                  <Icon size={26} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
const controlIcons = [Plug, ShieldCheck, LockKeyhole];
export function AccountControl() {
  return (
    <section className={styles.control} id="control">
      <div className="section-shell">
        <div className={styles.controlHeading}>
          <h2>Your accounts stay under your control</h2>
          <ShieldCheck strokeWidth={0.7} size={160} />
        </div>
        <div className={styles.controlGrid}>
          {control.map(([title, text], i) => {
            const Icon = controlIcons[i];
            return (
              <article key={title}>
                <Icon size={28} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
        <p className={styles.controlNote}>
          AI can be wrong, and synced data can be out of date. Check important
          dates, grades and instructions against Canvas and your course
          materials.
        </p>
      </div>
    </section>
  );
}
