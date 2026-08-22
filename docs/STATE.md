# Portfolio: state of play

Last updated 23 August 2026. This is the pick-it-up-later document for
arnavgoel.dev. Read it before touching anything; it exists so the next session
does not re-derive the same five facts, and so nobody has to discover the way
this repo can silently stop deploying by watching it happen.

Written the day the site spent two days serving a stale build without anybody
noticing.

---

## 0. Where it lives

| | |
|---|---|
| Repo | `ArnavGoel03/portfolio`, private |
| Working copy | `~/dev/portfolio`, branch `main` |
| Host | Vercel, project `arnavgoel03s-projects/portfolio` |
| Domain | https://arnavgoel.dev |
| Deploy | Push to `main`. There is no other path and no manual step |
| Gate | `.github/workflows/gate.yml` on every push and PR: lint, typecheck, `check:llms`, build |
| Fallback | A Cloudflare Worker named `portfolio`, deployed and deliberately unreachable |
| Package manager | **pnpm**. `pnpm-lock.yaml` is what Vercel installs from |
| Framework | Next.js 16 App Router, React 19, Tailwind 4 |

The Vercel CLI is authenticated on this machine as `arnavgoel03` and the
project is linked, so `npx vercel ls`, `npx vercel inspect --logs <url>` and
`npx vercel env ls` all work from the repo root without further setup. Those
three commands are how you find out what the host actually did, and they are
faster than guessing from the outside.

---

## 1. Running it, and the gate

```bash
pnpm dev             # dev server
pnpm build           # production build, Turbopack
pnpm lint            # eslint, and it must return nothing at all
npx tsc --noEmit     # typecheck, which the build does NOT do for you
pnpm cf:build        # build the Cloudflare Worker without deploying it
```

**`.github/workflows/gate.yml` now runs lint, typecheck, `check:llms` and the
build on every push to `main` and every pull request**, with
`cancel-in-progress` so a chain of quick pushes leaves one run standing. First
green run was 1m5s. Run the same four commands locally anyway: CI tells you
after the push, and the build minute is spent either way.

It is deliberately not part of the Vercel build. Next 16 does not lint or
typecheck during `build`, and adding it there would pay for the work twice and
put the gate in the path of shipping in a hurry.

That gap has already cost two days of live time. `src/middleware.ts` exported a
function called `proxy`, which is the Next 16 name for a file called
`proxy.ts`; in a file called `middleware.ts` Turbopack finds nothing to run and
fails the build in 19 seconds. Every push failed the same way, the last good
deployment stayed up, and the site went on serving content two commits old
while three separate pushes reported success at the git level. Nobody looks at
a deployment list unprompted. A local gate would have caught it in one command.

Two ways the same failure looks from outside, worth telling apart:

- **Old content, HTTP 200.** The build is failing. `npx vercel ls` shows the
  most recent deployment as `Error`; `npx vercel inspect --logs <url>` prints
  the reason.
- **HTTP 402 on every route, including the apex.** The account is bandwidth
  blocked, which is account-wide and hits every project on it. This happened
  for about a week in August 2026 and is why the Cloudflare hatch exists. It
  clears on its own or on payment; no code change helps.

---

## 2. The toolchain, and the two versions that are deliberately not latest

Every dependency is pinned exact, no carets, so an install is reproducible and
an upgrade is a visible line in a diff rather than a silent drift.

Two are held one major back, and both were tried first and seen to break. Do
not "helpfully" bump them without re-running the checks below.

**TypeScript stays at 6.0.3.** With 7.0.2 installed, ESLint does not merely
warn, it fails to load: `@typescript-eslint/typescript-estree`, which
`eslint-config-next` pulls in, throws `Cannot read properties of undefined
(reading 'Cjs')` reading a compiler internal that TS 7 moved. The declared peer
range says the same thing more quietly: `typescript >=4.8.4 <6.1.0`.
*Unblocks when:* `npm view typescript-eslint peerDependencies` accepts 7.

**ESLint stays at 9.39.5.** With 10.9.0, `eslint-plugin-react@7.37.5` throws
`contextOrFilename.getFilename is not a function` on the first file it lints,
because ESLint 10 removed a context API it uses. Its newest published release
peers `eslint ^9.7`.
*Unblocks when:* `npm view eslint-plugin-react peerDependencies` lists 10.

Everything else was moved to the newest published version on 22 August 2026:
next and eslint-config-next 16.3.2, react and react-dom 19.2.8, tailwindcss and
its postcss plugin 4.3.3, framer-motion 13.1.1, lucide-react 1.33.0,
@base-ui/react 1.7.0, @types/node 26.2.0, resend, posthog-js, tailwind-merge,
react-icons, shadcn and wrangler.

**Never add `package-lock.json` back.** It sat beside `pnpm-lock.yaml` for
months, 354 KB and stale. Which one a host picks is detection, not
configuration, and the two disagreed.

---

## 3. Where the content comes from

**`src/lib/projects.ts` is the source of truth for projects.** Every entry gets
a `/projects/[slug]` page. Four flagship entries render a deep case study from
`src/lib/case-studies.ts`; everything else renders a lighter profile from the
project metadata alone. `id` is the URL slug, so renaming one is a redirect in
`next.config.ts` as well (see `/projects/simple-games`, which 308s to
`/projects/glass-table-games`).

`Project.surfaces` is how a studio entry lists the products under it without
listing each as its own project. A surface renders as a tappable card with a
screenshot, a label, an optional `holds` line naming what is inside it, and a
blurb. Glass Table Games is the worked example: six cards, and every one names
the games behind it, because nothing in the word "Deal" tells a reader that
Call Break is in there.

**Screenshots live in `public/shots/`**, `s-<name>.webp` for surface cards and
`<name>.webp` for a project's own image. Capture them from the live site at
1600 wide, crop to 16:10 from the top (the card is `aspect-[16/10]
object-cover object-top`), and convert with `cwebp -q 82`. Never reuse art from
a rebranded version of a site.

**`public/llms.txt` and `public/llms-full.txt` are hand-written and do not read
from anything.** This is the largest drift hazard in the repo. They are the
files an AI crawler reads, and on 22 August they were missing eight shipped
projects entirely, still described the games studio under a name it had not
used for days, and carried a GPA of 3.96 that matched none of the three audited
figures. They are correct now, and `pnpm check:llms` is what keeps them that
way: it fails if a project in `projects.ts` is never mentioned in `llms.txt`, if
either file quotes a GPA that is not in `lib/constants.ts`, or if it parses
fewer than 15 projects, which is how a regex that has stopped matching announces
itself instead of passing forever. The prose stays hand written on purpose. A
generator would flatten a sentence of editorial judgement per project into a
list of tags.

**The Notion overlay is live code and currently dormant.** `src/lib/notion.ts`
is imported by the home, projects and experience pages, each of which merges
Notion rows over the static list. `getNotionClient` returns null when
`NOTION_API_KEY` is unset, every getter then returns `[]`, and the static list
stands. No `NOTION_*` variable is set on Vercel, so in production this path is
inert. It is typed properly (no `any`) and pinned at `@notionhq/client` 2.x on
purpose; version 5 renamed the query surface, and rewriting a dormant
integration is not worth a major.

---

## 4. Hosting: Vercel now, Cloudflare deployed and waiting

The site is on Vercel and should stay there while the account is healthy.

**The hatch is deployed, proven, and then switched off for readers.** It was
deployed to `portfolio.goelhome.workers.dev` and checked over the network as a
whole working site: home page, project pages, `llms.txt` and the basic-auth
private route all correct. Then `workers_dev: false` went into `wrangler.jsonc`
and it was redeployed, so the script is still there and the address answers 404.

That is deliberate. Vercel is healthy again, and a second public copy of a
portfolio is every page of it competing with arnavgoel.dev in search results,
which is a real cost for a fallback nobody is using. Turning it back on is one
line in `wrangler.jsonc` and one `pnpm cf:deploy`, or a DNS record if the point
is to actually take over.

If Vercel blocks the account again, the whole move is a DNS change. Two things
that copy do NOT have, because moving a live API key between platforms is not
something to do speculatively:

- `RESEND_API_KEY`, so the contact form will 500 there until somebody sets it
  (`npx wrangler secret put RESEND_API_KEY`).
- The ORCID and PostHog variables, for the same reason.

`PRIVATE_AUTH` **is** set on the Worker, so the private route behaves there
exactly as it does in production.

---

## 5. Open, in the order worth doing

Six of the items that were here on 22 August are closed. What closed them is in
sections 1 to 4: the CI gate, `check:llms`, `PRIVATE_AUTH` on Vercel, the
deployed Cloudflare Worker, `shadcn` moved out of `dependencies`, and ESLint
told to ignore build output. What is left is genuinely waiting on somebody else
or on a decision.

1. **TypeScript 7 and ESLint 10 are blocked upstream.** Mechanisms and unblock
   conditions are in section 2. Re-checked on 23 August 2026: `typescript-eslint`
   still declares `typescript >=4.8.4 <6.1.0`, and `eslint-plugin-react` is still
   at 7.37.5 peering `eslint ^9.7`. Two `npm view` calls settle it; do not
   re-derive by installing and watching it break.

2. **The Cloudflare fallback has no `RESEND_API_KEY`, ORCID or PostHog
   variables.** The public site works there; the contact form would 500. Setting
   them is `npx wrangler secret put <NAME>` and takes a minute, and it was not
   done speculatively because copying a live API key onto a second platform is
   a decision rather than a chore. Do it the day the hatch is taken.

3. **The Notion overlay is a decision, not a defect.** It is dormant in
   production, typed, and pinned at `@notionhq/client` 2.x because version 5
   renamed the query surface. Either switch it on (set `NOTION_*` on Vercel and
   accept the v5 rewrite) or delete `src/lib/notion.ts` and its three importers.
   Leaving it is fine; it costs one dependency and no runtime.

4. **A blank screenshot of this site is probably the harness, not the site.**
   After the framer-motion 12 to 13 upgrade, a full-page `shot.mjs` capture of
   the home page came back with the nav rendered and the entire hero black,
   twice, including with an 11 second settle. The page was fine: a CDP session
   reported `h1` at opacity 1, no exceptions, and a viewport screenshot taken in
   that same session showed the hero, the typewriter line and the status cards
   exactly right. The animated hero paints into compositor layers the
   beyond-viewport capture path does not always flush. Verify the DOM before
   concluding the page is broken, and capture with
   `Page.captureScreenshot({captureBeyondViewport: false})` in the session that
   just read it.

5. **Not this repo, but adjacent and open:** the Circuit front door still does
   not offer the app install. See section 6.

---

## 6. Adjacent repos, and who owns what

Two other repositories were touched in the same sweep and have their own
handover documents. Do not maintain their queues from here.

- **`~/dev/simplegames`** is the Glass Table Games studio site
  (glasstablegames.com). Its `docs/STATE.md` is authoritative. It now carries
  `src/lib/names.test.ts`, which fails if a retired studio or game name reaches
  anything a reader sees, or if the studio's name is spelled out anywhere but
  `brand.ts`.
- **`~/dev/chaupal-cards`** is the `main` worktree of the games monorepo
  (`ArnavGoel03/glass-table-games`, renamed from `chaupal`). **There are three
  worktrees on that one repository** and they sit on different branches:
  `~/dev/chaupal` on `feat/manifest-headless`, `~/dev/chaupal-manifest` on
  `feat/manifest`, `~/dev/chaupal-cards` on `main`. Run
  `git rev-parse --abbrev-ref HEAD` before trusting any diff there, and stage
  by explicit path: other sessions work in that tree at the same time.

One thing open there that belongs to that repo and not to this one: the Circuit
front door (`circuit.glasstablegames.com/` and `/play`) does not offer the app
install, because `apps/web/src/app/page.tsx` renders a bespoke `HomeScreen`
rather than `SiteChrome`, and the offer lives in `SiteChrome`. Deal, Charade and
Lattice all offer it on their front doors. The fix is written and staged in that
worktree by another session, using the `INSTALL_BENEFIT` constant now in
`apps/web/src/lib/site.ts`, but as of this writing it is neither committed nor
deployed, so the live front door still lacks it.

---

## 7. Conventions that apply here

- No em dashes or en dashes, anywhere, including this file and commit messages.
- Single source of truth. `src/lib/constants.ts` holds the GPA figures because
  3.911 was written out in nine-plus places and had already drifted from the
  audited 3.913. A literal in two files is a bug, and this repo has been bitten
  by that three times now: the GPA, the studio name, and the AEO files.
- A change is not done until it is live, and live means checked over the
  network rather than inferred from a successful push.
- Look at the rendered output before calling visual work done, and read
  section 5 item 4 before believing a black frame.
