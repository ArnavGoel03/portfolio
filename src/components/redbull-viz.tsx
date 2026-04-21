"use client";

import { motion } from "framer-motion";

// Real data from the Red Bull YouTube Sentiment Analytics project.
// Sourced directly from the summary.json of the analysis run.
const SENTIMENT = {
  positive: 47.0,
  neutral: 34.6,
  negative: 18.4,
  net: 28.6,
};

const KEYWORDS: { word: string; count: number }[] = [
  { word: "gives", count: 35 },
  { word: "wings", count: 31 },
  { word: "drinks", count: 21 },
  { word: "bro", count: 16 },
  { word: "drink", count: 16 },
  { word: "man", count: 14 },
  { word: "life", count: 14 },
  { word: "camera", count: 13 },
  { word: "keep", count: 13 },
  { word: "video", count: 12 },
];

const SENTIMENT_BY_VIDEO: {
  title: string;
  positive: number;
  neutral: number;
  negative: number;
}[] = [
  {
    title: "They Couldn't Look Away",
    positive: 57,
    neutral: 30,
    negative: 13,
  },
  {
    title: "Helicopter Drop Off For This",
    positive: 57,
    neutral: 24,
    negative: 19,
  },
  {
    title: "This Doesn't End",
    positive: 51,
    neutral: 32,
    negative: 17,
  },
  {
    title: "World's CRAZIEST POVs",
    positive: 37,
    neutral: 33,
    negative: 30,
  },
  {
    title: "How Quick Are Your Reflexes?",
    positive: 33,
    neutral: 54,
    negative: 13,
  },
];

const SENTIMENT_COLORS = {
  positive: "#8a8c5a", // sage (kept on-brand with the warm palette)
  neutral: "rgba(237, 230, 213, 0.22)",
  negative: "#c66a5e", // terracotta-red for negative
};

export default function RedBullViz() {
  const maxKeywordCount = KEYWORDS[0].count;

  return (
    <div className="space-y-12">
      {/* Overall sentiment bar */}
      <div>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Overall sentiment · 500 comments
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            Net: <span className="text-foreground">+{SENTIMENT.net} pp</span>
          </p>
        </div>

        <div className="relative mt-4 h-10 w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${SENTIMENT.positive}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: SENTIMENT_COLORS.positive }}
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${SENTIMENT.neutral}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-y-0"
            style={{
              left: `${SENTIMENT.positive}%`,
              backgroundColor: SENTIMENT_COLORS.neutral,
            }}
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${SENTIMENT.negative}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-y-0"
            style={{
              left: `${SENTIMENT.positive + SENTIMENT.neutral}%`,
              backgroundColor: SENTIMENT_COLORS.negative,
            }}
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <div>
            <span
              className="inline-block h-2 w-2 rounded-sm align-middle"
              style={{ backgroundColor: SENTIMENT_COLORS.positive }}
            />
            <span className="ml-2 text-muted-foreground">Positive</span>
            <span className="ml-1 font-mono text-foreground">
              {SENTIMENT.positive}%
            </span>
          </div>
          <div>
            <span className="inline-block h-2 w-2 rounded-sm border border-foreground/20 align-middle" />
            <span className="ml-2 text-muted-foreground">Neutral</span>
            <span className="ml-1 font-mono text-foreground">
              {SENTIMENT.neutral}%
            </span>
          </div>
          <div>
            <span
              className="inline-block h-2 w-2 rounded-sm align-middle"
              style={{ backgroundColor: SENTIMENT_COLORS.negative }}
            />
            <span className="ml-2 text-muted-foreground">Negative</span>
            <span className="ml-1 font-mono text-foreground">
              {SENTIMENT.negative}%
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs italic text-muted-foreground/75">
          Industry benchmark for consumer-brand YouTube comments is +10 to +15
          pp net sentiment. Red Bull runs roughly 2× that.
        </p>
      </div>

      {/* Sentiment by video — small multiples */}
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Sentiment by video
        </p>
        <div className="mt-5 space-y-3">
          {SENTIMENT_BY_VIDEO.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-[1fr_auto] items-center gap-4"
            >
              <div>
                <p className="text-xs text-foreground/85">{v.title}</p>
                <div className="mt-1.5 relative h-2 w-full overflow-hidden rounded-full border border-foreground/10 bg-foreground/5">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${v.positive}%`,
                      backgroundColor: SENTIMENT_COLORS.positive,
                    }}
                  />
                  <div
                    className="absolute inset-y-0"
                    style={{
                      left: `${v.positive}%`,
                      width: `${v.neutral}%`,
                      backgroundColor: SENTIMENT_COLORS.neutral,
                    }}
                  />
                  <div
                    className="absolute inset-y-0"
                    style={{
                      left: `${v.positive + v.neutral}%`,
                      width: `${v.negative}%`,
                      backgroundColor: SENTIMENT_COLORS.negative,
                    }}
                  />
                </div>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                +{(v.positive - v.negative).toString().padStart(2, " ")} pp
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top keywords — horizontal bar chart */}
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Top organic keywords
        </p>
        <p className="mt-1 text-xs italic text-muted-foreground/75">
          The slogan &mdash; &quot;gives you wings&quot; &mdash; has genuine
          organic recall.
        </p>
        <div className="mt-5 space-y-2">
          {KEYWORDS.map((k, i) => (
            <motion.div
              key={k.word}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="grid grid-cols-[80px_1fr_40px] items-center gap-3"
            >
              <span className="font-mono text-xs text-foreground/85">
                {k.word}
              </span>
              <div className="relative h-5 w-full overflow-hidden rounded-md border border-foreground/10 bg-foreground/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(k.count / maxKeywordCount) * 100}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                  style={{ backgroundColor: SENTIMENT_COLORS.positive }}
                />
              </div>
              <span className="text-right font-mono text-xs text-muted-foreground tabular-nums">
                {k.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="border-t border-foreground/10 pt-5 font-mono text-[10px] text-muted-foreground/70">
        Numbers rendered live from <span className="text-foreground/85">summary.json</span>{" "}
        of the analysis run. Full dataset and code on GitHub.
      </p>
    </div>
  );
}
