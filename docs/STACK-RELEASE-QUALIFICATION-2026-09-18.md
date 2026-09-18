# Portfolio release qualification, 18 September 2026

The upgraded source is verified and merged, but the production requeue is blocked
by the Vercel free-tier daily deployment-request limit. The old site is available.

## Source certification

- Certified stack merge: `d2ac40b`, PR3; hosted gate `35269888137` passed lint,
  native TS7, nine behavior tests, crawler checks, production build, analytics
  bundle guard and desktop/phone browser acceptance. Seven images were inspected.
- Current main requested for deployment:
  `a25ff9500f715db745d4e88063deebe9be763a83`.
- `git diff --exit-code d2ac40b a25ff95 -- . ':!docs'` passes. All subsequent
  changes are documentation and retained screenshots. No unverified application
  code is included, so unchanged source/browser gates were not rerun.

## Provider request and refusal

Fresh project/team reads: project `prj_wFHa8FWJDuqzMyxIFleXY6ivZDsJ`, paused=false,
Next.js on Node 24, GitHub repository 1202121229, production branch main, Hobby plan,
team softBlock=null. Existing build/install/root configuration was preserved.

One POST to `/v13/deployments` requested target production, the existing project,
and GitHub source ref `a25ff9500f715db745d4e88063deebe9be763a83`. It used the existing
CLI credential inside the process; no credential is included in this receipt.

Response: HTTP 402, `payment_required`, resource `api-deployments-free-per-day`.
Provider message: `Resource is limited - try again in 24 hours (more than 100,
code: "api-deployments-free-per-day").` Limit total 100, remaining 0; reset epoch
1789773128379, or 2026-09-18 23:12:08.379 UTC (19 September 04:42:08 IST).
No deployment ID was created. No automatic retry, local deployment CLI, provider
resume, budget, plan, billing or project-setting edit occurred.

## Live readback

The arnavgoel.dev alias points to READY deployment
`dpl_Fw25bv2ZDA222nFzb7tLC6m4cUUT`, GitHub/main source
`82a4fd4125b9b99c1bc6be3a79de945ba93ffe7c`. Both alias and deployment metadata
agree. That source's manifest has Next 16.3.2 and React 19.2.8, so it is not the
Next 16.3.5/React 19.3.0 upgrade.

Home, `/projects` and `/llms.txt` return HTTP 200 with expected content types;
the HTML contains the expected site identity and no paused-deployment response.
All 18 unique same-origin JS/CSS references from home/projects return HTTP 200
with nonempty content and the correct JavaScript/CSS content type. This verifies
availability of the old deployment only, not byte identity to the new build or
rendered acceptance of a new release.

Once the provider allowance resets, requeue the exact verified source (or a
proven documentation-only successor), then verify the new READY source, alias
and live assets. No recurring or scheduled job was created.

## Read-only continuation, 18 September 2026, 07:39 UTC

Fresh project/team metadata still reports paused=false and softBlock=null. The
canonical alias and READY deployment still identify old source `82a4fd4`. Home,
projects and llms.txt return 200 with expected content types and site identity.
The five newest deployment records remain BLOCKED from the earlier project pause;
the newest is `dpl_8hjrzqz2GUzAqdcL4e9Da8Y8riyG`, source `a25ff95`. No newer
successful stack deployment appeared.

Fetched main is `c709026`; comparison with `d2ac40b` still finds no changes outside
docs, so the certified source/browser acceptance remains applicable. No build or
browser rerun is needed for unchanged source. The prior API response is the latest
quota evidence: remaining 0, reset 23:12:08.379 UTC, still in the future at this
check. Project unpaused does not establish that this separate quota has cleared.
No deployment POST was repeated, and no host setting was changed. The only release
step left is an exact verified GitHub-source requeue after the allowance resets,
followed by READY-source, alias and live-asset verification.
