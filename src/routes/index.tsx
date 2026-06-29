import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import boneWhiteAsset from "@/assets/unavailable-bone-white.png.asset.json";
import coastalSandAsset from "@/assets/unavailable-coastal-sand.png.asset.json";
import deepCharcoalAsset from "@/assets/unavailable-deep-charcoal.png.asset.json";
import concreteEnvironmentAsset from "@/assets/unavailable-concrete-environment.png.asset.json";
import midnightNavyAsset from "@/assets/unavailable-midnight-navy.png.asset.json";
import washedGraphiteAsset from "@/assets/unavailable-washed-graphite.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UNAVAILABLE, LATELY. | Luxury Streetwear Launch" },
      {
        name: "description",
        content:
          "Cinematic launch website for UNAVAILABLE, LATELY. presenting five heavyweight tees in a brutalist concrete installation.",
      },
      { property: "og:title", content: "UNAVAILABLE, LATELY. | Luxury Streetwear Launch" },
      {
        property: "og:description",
        content:
          "Five elevated heavyweight tees presented inside a cinematic concrete installation with a release countdown.",
      },
    ],
  }),
  component: Index,
});

type ShirtKey = "deep-charcoal" | "washed-graphite" | "coastal-sand" | "bone-white" | "midnight-navy";

interface ShirtColorway {
  id: ShirtKey;
  number: string;
  label: string;
  shortLabel: string;
  url: string;
  toneClass: string;
  shadowClass: string;
  spotlightClass: string;
}

const colorways: ShirtColorway[] = [
  {
    id: "deep-charcoal",
    number: "01",
    label: "DEEP CHARCOAL",
    shortLabel: "Deep Charcoal Black",
    url: deepCharcoalAsset.url,
    toneClass: "colorway-tone-charcoal",
    shadowClass: "shirt-shadow-deep",
    spotlightClass: "spotlight-charcoal",
  },
  {
    id: "washed-graphite",
    number: "02",
    label: "WASHED GRAPHITE",
    shortLabel: "Washed Graphite",
    url: washedGraphiteAsset.url,
    toneClass: "colorway-tone-graphite",
    shadowClass: "shirt-shadow-graphite",
    spotlightClass: "spotlight-graphite",
  },
  {
    id: "coastal-sand",
    number: "03",
    label: "COASTAL SAND",
    shortLabel: "Coastal Sand",
    url: coastalSandAsset.url,
    toneClass: "colorway-tone-sand",
    shadowClass: "shirt-shadow-sand",
    spotlightClass: "spotlight-sand",
  },
  {
    id: "bone-white",
    number: "04",
    label: "BONE WHITE",
    shortLabel: "Bone White",
    url: boneWhiteAsset.url,
    toneClass: "colorway-tone-bone",
    shadowClass: "shirt-shadow-bone",
    spotlightClass: "spotlight-bone",
  },
  {
    id: "midnight-navy",
    number: "05",
    label: "MIDNIGHT NAVY",
    shortLabel: "Midnight Navy",
    url: midnightNavyAsset.url,
    toneClass: "colorway-tone-navy",
    shadowClass: "shirt-shadow-navy",
    spotlightClass: "spotlight-navy",
  },
];

const storyLines = [
  "HEAVYWEIGHT DOUBLE-KNIT",
  "STRUCTURED COLLAR",
  "TAILORED DRAPE",
  "NO EXTERIOR BRANDING",
  "COLORWAY ARCHIVE",
];

const detailCards = [
  { label: "01", title: "Elevated collar", focus: "detail-collar", offset: "detail-position-a" },
  { label: "02", title: "Fabric texture", focus: "detail-fabric", offset: "detail-position-b" },
  {
    label: "03",
    title: "Reinforced shoulder seam",
    focus: "detail-shoulder",
    offset: "detail-position-c",
  },
  { label: "04", title: "Internal woven label", focus: "detail-label", offset: "detail-position-d" },
  { label: "05", title: "Heavyweight hem construction", focus: "detail-hem", offset: "detail-position-e" },
];

const releaseDate = new Date("2026-08-01T00:00:00-04:00");

function formatCountdown(target: Date) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => formatCountdown(target));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(formatCountdown(target));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  return timeLeft;
}

function Index() {
  const [activeColorway, setActiveColorway] = useState<ShirtKey>("deep-charcoal");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const countdown = useCountdown(releaseDate);

  const activeProduct = useMemo(
    () => colorways.find((item) => item.id === activeColorway) ?? colorways[0],
    [activeColorway],
  );

  const { scrollYProgress } = useScroll();
  const cinematicProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 22, mass: 0.5 });
  const heroShift = useTransform(cinematicProgress, [0, 0.35], [0, -180]);
  const installationSpread = useTransform(cinematicProgress, [0, 0.24], [0, 220]);
  const environmentZoom = useTransform(cinematicProgress, [0, 0.6], [1.03, 1.18]);
  const darkness = useTransform(cinematicProgress, [0.7, 1], [0.08, 0.88]);

  const shirtX1 = useTransform(installationSpread, (value) => value * -0.36);
  const shirtX2 = useTransform(installationSpread, (value) => value * -0.18);
  const shirtX3 = useTransform(installationSpread, (value) => value * 0);
  const shirtX4 = useTransform(installationSpread, (value) => value * 0.19);
  const shirtX5 = useTransform(installationSpread, (value) => value * 0.38);

  const installationItems = [
    { shirt: colorways[0], className: "shirt-pos-1", x: shirtX1, y: pointer.y * 12, pointerX: pointer.x * 18 },
    { shirt: colorways[1], className: "shirt-pos-2", x: shirtX2, y: pointer.y * 10, pointerX: pointer.x * 20 },
    { shirt: colorways[2], className: "shirt-pos-3", x: shirtX3, y: pointer.y * 8, pointerX: pointer.x * 22 },
    { shirt: colorways[3], className: "shirt-pos-4", x: shirtX4, y: pointer.y * 6, pointerX: pointer.x * 24 },
    { shirt: colorways[4], className: "shirt-pos-5", x: shirtX5, y: pointer.y * 4, pointerX: pointer.x * 26 },
  ] as const;

  return (
    <main
      className="bg-background text-foreground"
      onMouseMove={(event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        setPointer({ x, y });
      }}
    >
      <section className="relative isolate min-h-screen overflow-clip border-b border-border/60">
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroShift,
            scale: environmentZoom,
            transformOrigin: "center center",
          }}
        >
          <img
            src={concreteEnvironmentAsset.url}
            alt="Concrete architectural environment framing the launch installation"
            className="hero-environment h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="hero-camera-shift absolute inset-0"
          style={{
            x: pointer.x * 20,
            y: pointer.y * 12,
          }}
        >
          <div className="hero-light-grid absolute inset-0" />
          <motion.div className="hero-light-beam absolute inset-0" style={{ x: pointer.x * 30, y: pointer.y * -18 }} />
          <div className="hero-vignette absolute inset-0" />
        </motion.div>

        <header className="absolute inset-x-0 top-0 z-30">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <button
              type="button"
              aria-label="Open navigation"
              className="editorial-menu-button"
            >
              <span />
              <span />
              <span />
            </button>
            <div className="eyebrow text-center">UNAVAILABLE, LATELY.</div>
            <div className="eyebrow">RELEASE 001</div>
          </div>
        </header>

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-32">
          <div className="grid min-h-[calc(100vh-8rem)] grid-rows-[auto_auto_1fr_auto] gap-8 lg:grid-rows-[auto_1fr_auto]">
            <div className="max-w-[36rem] space-y-6">
              <div className="eyebrow">ARCHIVE INSTALLATION / ST. PETERSBURG</div>
              <h1 className="hero-title max-w-[12ch]">NOT MADE TO BE AVAILABLE.</h1>
              <div className="max-w-[28rem] space-y-3 text-sm text-muted-foreground sm:text-base">
                <p>Five elevated heavyweight tees.</p>
                <p>Produced in limited quantities.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="outline" size="lg" className="launch-button rounded-none">
                  VIEW THE COLLECTION
                </Button>
                <a href="#countdown" className="editorial-link">
                  RELEASE NOTIFICATION
                </a>
              </div>
            </div>

            <div className="relative min-h-[44vh] lg:min-h-0">
              <motion.div className="installation-plane installation-plane-back" style={{ x: pointer.x * -18, y: pointer.y * -10 }} />
              <motion.div className="installation-plane installation-plane-mid" style={{ x: pointer.x * 12, y: pointer.y * 8 }} />

              {installationItems.map((item, index) => (
                <motion.img
                  key={item.shirt.id}
                  src={item.shirt.url}
                  alt={`${item.shirt.shortLabel} heavyweight tee`}
                  className={`installation-shirt ${item.className} ${item.shirt.shadowClass}`}
                  style={{ x: item.x, y: item.y, translateX: item.pointerX }}
                  animate={{
                    y: [item.y, item.y - (8 + index), item.y],
                    rotate: [-0.4 + index * 0.18, 0.3 - index * 0.08, -0.4 + index * 0.18],
                  }}
                  transition={{
                    duration: 13 + index,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="grid gap-8 border-t border-border/50 pt-5 sm:grid-cols-3 lg:max-w-[62rem]">
              <div>
                <div className="eyebrow">CONSTRUCTION</div>
                <p className="meta-copy">Dense double-knit jersey calibrated for structure, weight and controlled drape.</p>
              </div>
              <div>
                <div className="eyebrow">COLORWAY ARCHIVE</div>
                <p className="meta-copy">Deep Charcoal, Washed Graphite, Coastal Sand, Bone White, Midnight Navy.</p>
              </div>
              <div>
                <div className="eyebrow">LIMITATION</div>
                <p className="meta-copy">Limited release. No planned restock once the archive is claimed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border/60">
        <div className="section-grid">
          <div className="space-y-5">
            <div className="eyebrow">PRODUCT STORY</div>
            <h2 className="section-title max-w-[12ch]">FIVE COLORS. ONE CONSTRUCTION.</h2>
          </div>
          <div className="space-y-3">
            {storyLines.map((line, index) => (
              <motion.div
                key={line}
                className="story-line"
                initial={{ opacity: 0.22, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="colorway-stage border-b border-border/60">
        <div className={`colorway-light ${activeProduct.spotlightClass}`} />
        <div className="section-grid colorway-grid">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="eyebrow">COLORWAY ARCHIVE</div>
              <h2 className="section-title max-w-[10ch]">CHOOSE THE TONE.</h2>
            </div>
            <div className="vertical-selector" role="tablist" aria-label="Select a colorway">
              {colorways.map((shirt) => {
                const isActive = shirt.id === activeColorway;
                return (
                  <button
                    key={shirt.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`selector-item ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveColorway(shirt.id)}
                  >
                    <span className="selector-number">{shirt.number}</span>
                    <span>{shirt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[70vh] overflow-hidden border border-border/50 bg-card/10">
            <div className="colorway-environment" style={{ backgroundImage: `url(${concreteEnvironmentAsset.url})` }} />
            <div className={`colorway-overlay ${activeProduct.toneClass}`} />
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProduct.id}
                src={activeProduct.url}
                alt={`${activeProduct.shortLabel} heavyweight tee shown in archive view`}
                className={`colorway-shirt ${activeProduct.shadowClass}`}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="colorway-meta">
              <div className="eyebrow">CURRENT ARCHIVE</div>
              <p>{activeProduct.number}</p>
              <p>{activeProduct.label}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-border/60">
        <div className="section-grid details-intro">
          <div className="space-y-5">
            <div className="eyebrow">PRODUCT DETAILS</div>
            <h2 className="section-title max-w-[13ch]">BUILT TO HOLD ITS FORM.</h2>
          </div>
          <div className="max-w-[32rem] space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Dense double-knit construction gives the garment a structured silhouette without
              sacrificing comfort.
            </p>
          </div>
        </div>

        <div className="detail-grid">
          {detailCards.map((detail, index) => (
            <article key={detail.label} className="detail-card">
              <div className="detail-image-frame">
                <div className="detail-environment" style={{ backgroundImage: `url(${concreteEnvironmentAsset.url})` }} />
                <img
                  src={colorways[index % colorways.length].url}
                  alt={`${detail.title} detail of the heavyweight tee`}
                  className={`detail-shirt ${detail.focus} ${detail.offset}`}
                />
              </div>
              <div className="detail-meta">
                <div className="eyebrow">{detail.label}</div>
                <h3>{detail.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-b border-border/60">
        <div className="section-grid restrained-copy-grid">
          <div className="space-y-5">
            <div className="eyebrow">ABSENCE AS SIGNATURE</div>
            <h2 className="section-title max-w-[11ch]">NOTHING EXTERNAL.</h2>
          </div>
          <div className="space-y-4 text-base text-muted-foreground">
            <p>No chest graphic.</p>
            <p>No sleeve mark.</p>
            <p>No visible logo.</p>
            <p>Only the garment remains.</p>
          </div>
        </div>
      </section>

      <section id="countdown" className="countdown-shell border-b border-border/60">
        <div className="countdown-panel">
          <div className="eyebrow">RELEASE COUNTDOWN</div>
          <h2 className="section-title text-center">RELEASE 001</h2>
          <div className="countdown-display" aria-label="Release countdown">
            <span>{countdown.days}</span>
            <span className="countdown-separator">:</span>
            <span>{countdown.hours}</span>
            <span className="countdown-separator">:</span>
            <span>{countdown.minutes}</span>
            <span className="countdown-separator">:</span>
            <span>{countdown.seconds}</span>
          </div>
          <div className="countdown-labels" aria-hidden="true">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINUTES</span>
            <span>SECONDS</span>
          </div>

          <form
            className="notify-form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="notify-input"
            />
            <Button type="submit" variant="outline" size="lg" className="launch-button rounded-none">
              NOTIFY ME
            </Button>
          </form>
          <p className="meta-copy text-center">Limited quantities. No planned restock.</p>
        </div>
      </section>

      <section className="final-frame">
        <motion.div className="final-darkness" style={{ opacity: darkness }} />
        <div className="final-frame-inner">
          <div className="eyebrow">FINAL FRAME</div>
          <h2 className="final-brand">UNAVAILABLE, LATELY.</h2>
          <div className="final-location">
            <p>ST. PETERSBURG, FLORIDA</p>
            <p>27.7731° N, 82.6400° W</p>
          </div>
        </div>
      </section>
    </main>
  );
}
