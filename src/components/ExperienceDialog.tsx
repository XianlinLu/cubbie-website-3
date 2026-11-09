"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
  X,
  Plug,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { process, prompts } from "@/lib/content";
import styles from "./ExperienceDialog.module.css";
const flow = [
  { label: "Connect", Icon: Plug },
  { label: "Ask", Icon: MessageCircle },
  { label: "Review", Icon: Search },
  { label: "Act", Icon: ShieldCheck },
];
export function ExperienceDialog({
  mode,
  onClose,
}: {
  mode: "watch" | "start";
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(mode === "watch");
  const [tools, setTools] = useState<string[]>([]);
  const [question, setQuestion] = useState(prompts[0]);
  const [reviewed, setReviewed] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    if (!playing || mode !== "watch") return;
    const timer = setInterval(() => setStep((s) => (s + 1) % 4), 6500);
    return () => clearInterval(timer);
  }, [playing, mode]);
  const toggleTool = (tool: string) =>
    setTools((v) =>
      v.includes(tool) ? v.filter((x) => x !== tool) : [...v, tool],
    );
  const next = () => {
    if (step < 3) setStep(step + 1);
  };
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="experience-title"
    >
      <div className={styles.panel}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        <div className={styles.copy}>
          <p className="eyebrow">
            {mode === "watch" ? "See how it works" : "Get started"}
          </p>
          <h2 id="experience-title">{process[step][0]}</h2>
          <p className={styles.description}>{process[step][1]}</p>
          {mode === "start" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className={styles.form}
            >
              {step === 0 && (
                <fieldset>
                  <legend>Connect the tools you choose</legend>
                  {["Canvas", "Google"].map((tool) => (
                    <label
                      key={tool}
                      className={tools.includes(tool) ? styles.checked : ""}
                    >
                      <input
                        type="checkbox"
                        checked={tools.includes(tool)}
                        onChange={() => toggleTool(tool)}
                      />
                      <span>{tool}</span>
                      <span className={styles.check}>
                        {tools.includes(tool) && <Check size={14} />}
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}
              {step === 1 && (
                <label className={styles.questionLabel}>
                  Ask in plain language
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    maxLength={500}
                    rows={3}
                  />
                </label>
              )}
              {step === 2 && (
                <div className={styles.review}>
                  <p>{tools.join(" + ")}</p>
                  <blockquote>{question}</blockquote>
                  <p>
                    Check dates, files, instructions and anything Cubbie writes.
                  </p>
                </div>
              )}
              {step === 3 && (
                <label className={styles.confirm}>
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                  />
                  <span>
                    Cubbie asks before it sends an email, and you submit your
                    own work.
                  </span>
                </label>
              )}
              <p className={styles.preview}>
                Interactive preview only. No accounts are connected and no data
                is sent.
              </p>
              {step < 3 ? (
                <button
                  className="button yellow"
                  type="submit"
                  disabled={
                    (step === 0 && !tools.length) ||
                    (step === 1 && !question.trim())
                  }
                >
                  Next step
                  <ArrowRight size={15} />
                </button>
              ) : (
                <a
                  className={`button yellow ${!reviewed ? styles.disabled : ""}`}
                  href={reviewed ? "https://cubbie.ai/sign-in" : undefined}
                  aria-disabled={!reviewed}
                  tabIndex={reviewed ? 0 : -1}
                >
                  Get started
                  <ArrowUpRight size={15} />
                </a>
              )}
            </form>
          )}
          {mode === "watch" && (
            <a className="button white" href="#how-it-works" onClick={onClose}>
              See how it works
              <ArrowRight size={15} />
            </a>
          )}
        </div>
        <div className={styles.art} aria-hidden="true">
          <span className={styles.artEyebrow}>Your schoolwork, connected</span>
          <div className={styles.stepDisplay} key={step}>
            <span className={styles.stepNumber}>0{step + 1}</span>
            <span className={styles.stepLabel}>{flow[step].label}.</span>
          </div>
          <div className={styles.flow}>
            {flow.map(({ label, Icon }, index) => (
              <div
                key={label}
                className={`${styles.flowNode} ${step === index ? styles.flowActive : ""}`}
              >
                <span className={styles.flowIcon}>
                  <Icon size={25} strokeWidth={1.4} />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.flowDescription}>{process[step][1]}</p>
        </div>
        <div className={styles.controls}>
          <div className={styles.counter}>
            <strong>{step + 1}</strong>
            <span>/ 4</span>
          </div>
          <div className={styles.dots} aria-label="Walkthrough steps">
            {process.map(([title], i) => (
              <button
                key={title}
                onClick={() => {
                  if (mode === "watch") {
                    setStep(i);
                    setPlaying(false);
                  }
                }}
                disabled={mode === "start"}
                aria-label={`Step ${i + 1}: ${title}`}
                aria-current={step === i ? "step" : undefined}
                className={step === i ? styles.active : ""}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            {step > 0 && (
              <button
                onClick={() => {
                  setStep(step - 1);
                  setPlaying(false);
                }}
                aria-label="Previous step"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            {mode === "watch" && (
              <>
                <button
                  onClick={() => setPlaying((v) => !v)}
                  aria-label={
                    playing ? "Pause walkthrough" : "Play walkthrough"
                  }
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={() => {
                    setStep((step + 1) % 4);
                    setPlaying(false);
                  }}
                  aria-label="Next step"
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
