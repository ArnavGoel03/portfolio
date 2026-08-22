import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Defaults only. The site is public and read-mostly, and the one dynamic
 * source (Notion, via getExperience) already falls back to the static
 * experience array when the token is absent, so an incremental cache would
 * add a binding and a failure mode without buying anything.
 */
export default defineCloudflareConfig();
