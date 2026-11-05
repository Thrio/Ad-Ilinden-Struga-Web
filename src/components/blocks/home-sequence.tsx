"use client";

/**
 * METRIC home band 5 scope filmstrip (our band 2a).
 *
 * Evidence: `research/peers/metric/states/home/sweep-1440-015.jpg`–`019.jpg`,
 * filmstrip positions (1440): active ~27% width, preview ~10% square, 16px gap.
 *
 * Bottom-rail alignment; active shrinks and exits up-left while the next grows
 * from the lower-right preview. One scroll focus (`index − focus`). Motion `useScroll`.
 */

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Language } from "@/lib/routes";

type SequenceCaptionCopy = { headline: string; description: string };

const SEQUENCE_CAPTIONS = {
  mk: [
    {
      headline: "На градилиштето",
      description: "Организирани работи на терен, со јасен план и сигурна изведба.",
    },
    {
      headline: "Прецизна изведба",
      description: "Внимание на секој детал, од темел до завршница.",
    },
    {
      headline: "Објекти во изградба",
      description: "Проекти што растат низ Струга и регионот.",
    },
    {
      headline: "Трајна градба",
      description: "Подготвена за иднината, направена да трае.",
    },
  ],
  en: [
    {
      headline: "On the construction site",
      description: "Organized field work with a clear plan and dependable delivery.",
    },
    {
      headline: "Precise execution",
      description: "Care in every detail, from foundation through to finish.",
    },
    {
      headline: "Structures taking shape",
      description: "Projects rising across Struga and the surrounding region.",
    },
    {
      headline: "Built for the long term",
      description: "Durable construction designed to serve the future.",
    },
  ],
} as const satisfies Record<Language, readonly [SequenceCaptionCopy, SequenceCaptionCopy, SequenceCaptionCopy, SequenceCaptionCopy]>;

const SEQUENCE_IMAGES = [
  { src: "/images/facebook/photo1.png" },
  { src: "/images/facebook/photo1.1.png" },
  { src: "/images/facebook/photo3.jpg" },
  { src: "/images/facebook/photo4.jpg" },
] as const;

const COUNT = 4;
const STEPS = COUNT - 1;
/** Matches `--space-16` (METRIC measured gap). */
const GAP_PX = 16;

type Body = { x: number; lift: number; w: number; aspect: number };
type Pose = Body & { opacity: number; z: number };
type Layout = { previewX: number };

type Geom = {
  restX: number;
  restW: number;
  restAspect: number;
  previewW: number;
  exitShiftX: number;
  exitLift: number;
};

/** 1440 filmstrip: large plate ~389px (27%), preview ~144px (10%). */
const wide: Geom = {
  restX: 0,
  restW: 27,
  restAspect: 0.68,
  previewW: 10,
  exitShiftX: 16,
  exitLift: 168,
};

/** 375: wider plates within the narrow stage. */
const narrow: Geom = {
  restX: -2,
  restW: 62,
  restAspect: 0.62,
  previewW: 17,
  exitShiftX: 16,
  exitLift: 96,
};

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

/** Zero velocity at 0 and 1 — removes the late “snap” into center at full size. */
function smootherstep(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function mix(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function lerpBody(from: Body, to: Body, t: number): Body {
  const eased = smooth(t);
  return {
    x: mix(from.x, to.x, eased),
    lift: mix(from.lift, to.lift, eased),
    w: mix(from.w, to.w, eased),
    aspect: mix(from.aspect, to.aspect, eased),
  };
}

function measureLayout(stageW: number, geom: Geom): Layout {
  const restWpx = (geom.restW / 100) * stageW;
  const previewWpx = (geom.previewW / 100) * stageW;
  const restCenterX = stageW * (0.5 + geom.restX / 100);
  const previewCenterX = restCenterX + restWpx / 2 + GAP_PX + previewWpx / 2;
  return { previewX: (previewCenterX / stageW - 0.5) * 100 };
}

function anchors(geom: Geom, layout: Layout) {
  const rest: Body = { x: geom.restX, lift: 0, w: geom.restW, aspect: geom.restAspect };
  const preview: Body = { x: layout.previewX, lift: 0, w: geom.previewW, aspect: 1 };
  const exit: Body = {
    x: geom.restX - geom.exitShiftX,
    lift: geom.exitLift,
    w: geom.previewW * 0.92,
    aspect: geom.restAspect,
  };
  const hidden: Body = {
    x: layout.previewX + geom.previewW * 1.4,
    lift: 0,
    w: 0,
    aspect: 1,
  };
  return { rest, preview, exit, hidden };
}

function widthOpacity(w: number, restW: number) {
  if (w <= 0.04) return 0;
  return smooth(Math.min(1, w / restW));
}

function queueRamp(leaderDelta: number) {
  return smooth(Math.max(0, Math.min(1, (0.65 - leaderDelta) / 0.35)));
}

function poseForDelta(delta: number, geom: Geom, layout: Layout, leaderDelta: number): Body {
  const { rest, preview, exit, hidden } = anchors(geom, layout);

  if (delta <= -1.05) {
    return { ...exit, w: mix(exit.w, 0, smooth(Math.min(1, -delta - 1))) };
  }
  if (delta < 0) {
    return lerpBody(rest, exit, smootherstep(-delta));
  }
  if (delta < 1) {
    return lerpBody(preview, rest, smootherstep(1 - delta));
  }
  if (delta <= 2) {
    const ramp = queueRamp(leaderDelta) * smooth(2 - delta);
    return lerpBody(hidden, preview, ramp);
  }
  return hidden;
}

function coupleIncoming(body: Body, outgoing: Body, stageW: number): Body {
  const outWpx = (outgoing.w / 100) * stageW;
  const inWpx = (body.w / 100) * stageW;
  const outCenter = stageW * (0.5 + outgoing.x / 100);
  const coupledCenter = outCenter + outWpx / 2 + GAP_PX + inWpx / 2;
  return { ...body, x: (coupledCenter / stageW - 0.5) * 100 };
}

function poseAt(
  index: number,
  progress: number,
  geom: Geom,
  layout: Layout,
  stageW: number,
): Pose {
  const focus = Math.min(STEPS, Math.max(0, progress * STEPS));
  const delta = index - focus;
  const leaderDelta = index > 0 ? index - 1 - focus : 1;
  let body = poseForDelta(delta, geom, layout, leaderDelta);

  const step = Math.floor(focus);
  const inStep = focus > step && focus < step + 1;
  if (inStep && index === step + 1) {
    const t = focus - step;
    const natural = body;
    const outgoing = poseForDelta(-t, geom, layout, leaderDelta);
    const coupled = coupleIncoming(natural, outgoing, stageW);
    const coupleWeight = 1 - smootherstep(Math.max(0, (t - 0.55) / 0.45));
    body = { ...natural, x: mix(coupled.x, natural.x, 1 - coupleWeight) };
  }

  const { rest: restPose } = anchors(geom, layout);
  const hold = smootherstep(1 - Math.min(1, Math.abs(delta) / 0.16));
  body = {
    x: mix(body.x, restPose.x, hold),
    lift: mix(body.lift, restPose.lift, hold),
    w: mix(body.w, restPose.w, hold),
    aspect: mix(body.aspect, restPose.aspect, hold),
  };

  let opacity = widthOpacity(body.w, geom.restW);
  if (delta < -0.15) {
    opacity *= smooth(1 + delta / 0.85);
  }

  return {
    ...body,
    opacity,
    z: Math.round(40 - Math.abs(delta) * 10),
  };
}

/** Matches scroll focus to the active plate (tighter handoff at step midpoints). */
function captionOpacity(index: number, progress: number) {
  const focus = Math.min(STEPS, Math.max(0, progress * STEPS));
  const dist = Math.abs(index - focus);
  if (dist >= 0.42) return 0;
  return smootherstep(1 - dist / 0.42);
}

function SequenceCaption({
  index,
  copy,
  progress,
}: {
  index: number;
  copy: SequenceCaptionCopy;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (value) => captionOpacity(index, value));

  return (
    <motion.div className="home-sequence__caption-block" style={{ opacity }}>
      <p className="home-sequence__caption-headline">{copy.headline}</p>
      <p className="home-sequence__caption-desc">{copy.description}</p>
    </motion.div>
  );
}

function Plate({
  index,
  progress,
  layout,
  stageW,
  placed,
  alt,
}: {
  index: number;
  progress: MotionValue<number>;
  layout: MotionValue<number>;
  stageW: MotionValue<number>;
  placed: MotionValue<number>;
  alt: string;
}) {
  const pose = useTransform([progress, layout, stageW, placed], ([value, flag, width]: number[]) => {
    const geom = flag > 0.5 ? narrow : wide;
    const w = Math.max(1, width);
    const measured = measureLayout(w, geom);
    return poseAt(index, value, geom, measured, w);
  });

  const left = useTransform(pose, (value) => `${50 + value.x}%`);
  const width = useTransform(pose, (value) => `${value.w}%`);
  const aspectRatio = useTransform(pose, (value) => value.aspect);
  const opacity = useTransform(pose, (value) => value.opacity);
  const zIndex = useTransform(pose, (value) => value.z);
  const y = useTransform(pose, (value) => -value.lift);

  return (
    <motion.div
      className="home-sequence__plate"
      style={{ left, width, aspectRatio, opacity, zIndex, x: "-50%", y }}
    >
      <img
        src={SEQUENCE_IMAGES[index].src}
        alt={alt}
        width={1200}
        height={1600}
        className="block h-full w-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

export function HomeSequence({ language }: { language: Language }) {
  const captions = SEQUENCE_CAPTIONS[language];
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const layout = useMotionValue(0);
  const stageW = useMotionValue(360);
  const placed = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const layoutMq = window.matchMedia("(max-width: 991px)");
    const apply = () => {
      layout.set(layoutMq.matches ? 1 : 0);
      stageW.set(stage.clientWidth);
      placed.set(placed.get() + 1);
    };
    apply();
    layoutMq.addEventListener("change", apply);
    const ro = new ResizeObserver(apply);
    ro.observe(stage);
    return () => {
      layoutMq.removeEventListener("change", apply);
      ro.disconnect();
    };
  }, [layout, stageW, placed]);

  return (
    <section data-band="2a" className="home-sequence" aria-label="Image sequence">
      <div ref={trackRef} className="home-sequence__track">
        <div ref={stageRef} className="home-sequence__stage">
          <div className="home-sequence__captions" aria-live="polite">
            {captions.map((copy, index) => (
              <SequenceCaption key={copy.headline} index={index} copy={copy} progress={scrollYProgress} />
            ))}
          </div>
          {Array.from({ length: COUNT }, (_, index) => (
            <Plate
              key={index}
              index={index}
              progress={scrollYProgress}
              layout={layout}
              stageW={stageW}
              placed={placed}
              alt={`${captions[index].headline}. ${captions[index].description}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
