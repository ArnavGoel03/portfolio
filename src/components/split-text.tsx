
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  mode?: "chars" | "words";
  as?: "span" | "div";
}

/**
 * Keeping the separators is the whole trick.
 *
 * `text.split(" ")` drops them, and since every unit is rendered as an
 * inline-block, the words then sit flush against each other: the hero tagline
 * rendered as "Ibuilddatasciencethatships." Splitting on a capturing group
 * keeps the whitespace as its own token, and emitting that token as ordinary
 * text (not an inline-block) leaves the browser a place to break the line.
 */
const WHITESPACE = /(\s+)/;

export default function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.7,
  stagger = 0.035,
  mode = "chars",
  as = "span",
}: SplitTextProps) {
  const Wrapper = as;
  const tokens = text.split(WHITESPACE).filter(Boolean);

  // Stagger runs across the whole string, not per word, so the reveal reads as
  // one sweep rather than restarting at every space.
  let unit = 0;

  return (
    <Wrapper className={className} style={{ display: "inline-block" }}>
      {tokens.map((token, t) => {
        if (WHITESPACE.test(token)) return <span key={t}>{token}</span>;

        // Characters animate individually but stay wrapped in their word, so a
        // line break can never land inside one ("I b / uild ML").
        const parts = mode === "words" ? [token] : Array.from(token);

        return (
          <span
            key={t}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {parts.map((part, p) => {
              const i = unit++;
              return (
                <span
                  key={p}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                  }}
                >
                  <span
                    className="char-rise"
                    style={
                      {
                        display: "inline-block",
                        willChange: "transform, opacity",
                        "--char-delay": `${delay + i * stagger}s`,
                        "--char-duration": `${duration}s`,
                      } as React.CSSProperties
                    }
                  >
                    {part}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Wrapper>
  );
}
