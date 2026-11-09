"use client";
import { useEffect } from "react";

/** Frame-rate independent desktop wheel damping; native keyboard and nested scrolling remain available. */
export function ScrollMotion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      current = window.scrollY,
      target = current,
      last = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const render = (time: number) => {
      const ratio = last ? Math.min((time - last) / (1000 / 60), 3) : 1;
      last = time;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, max));
      current += (target - current) * (1 - Math.exp(-0.1 * ratio));
      if (Math.abs(target - current) < 0.25) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      if (current !== target) frame = requestAnimationFrame(render);
      else stop();
    };
    const wheel = (event: WheelEvent) => {
      if (
        reduced.matches ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        document.querySelector("dialog[open]")
      )
        return;
      let node = event.target instanceof Element ? event.target : null;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          node.scrollHeight > node.clientHeight
        )
          return;
        node = node.parentElement;
      }
      if (!event.cancelable) return;
      event.preventDefault();
      if (!frame) current = target = window.scrollY;
      target +=
        event.deltaY *
        (event.deltaMode === 1
          ? 50
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      target = Math.max(
        0,
        Math.min(target, document.documentElement.scrollHeight - innerHeight),
      );
      if (!frame) frame = requestAnimationFrame(render);
    };
    const key = (event: KeyboardEvent) => {
      if (
        [
          "Home",
          "End",
          "PageDown",
          "PageUp",
          "ArrowDown",
          "ArrowUp",
          " ",
          "Escape",
        ].includes(event.key)
      )
        stop();
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", stop);
    window.addEventListener("hashchange", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("hashchange", stop);
    };
  }, []);
  return null;
}
