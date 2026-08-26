# PostHog Self-driving Setup Report

**Project:** Recurrly (Base) — Expo/React Native subscription tracking app  
**Date:** 2026-08-26  
**Inbox:** https://us.posthog.com/project/577799/inbox

## Summary

PostHog Self-driving has been configured for Recurrly. Session Replay, Error Tracking, and Support products were enabled server-side; six native signal sources were wired to the inbox; the scout troop was tuned to four scouts (general, product-analytics, feature-flags, health-checks); and two Replay Vision scanners were created with signals enabled. Findings will start appearing in the [Self-driving inbox](https://us.posthog.com/project/577799/inbox) within approximately 30 minutes of the first scout run.

---

## AI data processing

Approved. Organization-level AI data processing consent was granted before this run.

---

## GitHub

**Connected** — installed during this run.  
Integration ID: 250836 | Account: meshal23  
Self-driving can now research findings in code and open draft fixes against this repo's issues.

---

## Products enabled

| Product | Result | Notes |
|---|---|---|
| Session Replay | **Enabled** (inert on mobile) | Server-side toggle is on. No recordings will arrive until mobile SDK recording is configured in code — see follow-ups. |
| Error Tracking | **Enabled** (inert on mobile) | Server-side toggle is on. Exception autocapture needs SDK configuration on React Native — see follow-ups. |
| Support (Conversations) | **Enabled** | Server-side toggle is on. Tickets only arrive once an inbound channel (email / Slack / inbox) is connected — see follow-ups. |

**Mobile platform note:** This is a pure React Native/Expo app using `posthog-react-native`. The server-side product flips are on, but they are inert until the SDK is configured in code. No `posthog-js` init was checked (not applicable to this project).

---

## Signal sources

| Source product | Source type | Action | Notes |
|---|---|---|---|
| `signals_scout` | `cross_source_issue` | **On by default** | Scout gate — scout findings reach the inbox with no config row needed. |
| `health_checks` | `health_issue` | **Enabled** | ID: `01a03cc3-dc95-71ec-a85f-acde4d291165` |
| `error_tracking` | `issue_created` | **Enabled** | ID: `01a03cc3-e20f-7778-9435-2c3549489d9b` |
| `error_tracking` | `issue_reopened` | **Enabled** | ID: `01a03cc3-e73d-777f-ada7-d223561d590b` |
| `error_tracking` | `issue_spiking` | **Enabled** | ID: `01a03cc3-ea8c-749a-be76-6de4073223e5` |
| `session_replay` | `session_analysis_cluster` | **Enabled** | ID: `01a03cc3-f9cc-74b1-90c9-944a091f04b5` — sample rate: 0.1 |
| `conversations` | `ticket` | **Enabled** | ID: `01a03cc3-fe46-74e0-b2c8-45b47aba6914` — dormant until inbound channel connected |
| `llm_analytics` | — | **Skipped** | Internal-only, not a user-facing responder |
| `logs` | — | **Skipped** | Not a v1 responder |
| `replay_vision` | — | **Skipped** | Self-authorizing via `emits_signals` flag on each scanner — no row needed |

---

## Connected tools

No external tools were selected. All options were declined/cancelled.

| Tool | Status |
|---|---|
| GitHub Issues | Not used (not selected) |
| Linear | Not used (not selected) |
| Jira | Not used (not selected) |
| Sentry | Not used (not selected) |
| Zendesk | Not used (not selected) |

---

## Scout troop

**Budget:** 100 runs/day (early access default) | 0 runs used today | Max 3 per tick  
**Announcement:** "Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more."

### Enabled (4)

| Scout | Why enabled |
|---|---|
| `signals-scout-general` | Always on — watches cross-product correlations and surfaces no specialist covers |
| `signals-scout-product-analytics` | Recurrly actively tracks screen views and custom events (`subscription_card_expanded`, `subscription_viewed`, `user_signed_in`, `sign_in_failed`) |
| `signals-scout-feature-flags` | SDK configured with `preloadFeatureFlags: true` and `sendFeatureFlagEvent: true` — `$feature_flag_called` data will arrive as flags are used |
| `signals-scout-health-checks` | Always useful on a fresh setup to catch instrumentation gaps |

### Disabled (23)

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | Covered by the native error tracking source (step 4) — not a re-enable candidate |
| `signals-scout-session-replay` | Covered by the native session replay source (step 4) — not a re-enable candidate |
| `signals-scout-surveys` | No surveys configured or in use |
| `signals-scout-revenue-analytics` | No payment SDK in the project (no Stripe, RevenueCat, etc.) |
| `signals-scout-ai-observability` | No AI/LLM SDK or `$ai_*` events |
| `signals-scout-web-analytics` | Mobile app — no web traffic or pageview tracking |
| `signals-scout-web-vitals` | Mobile app — Core Web Vitals don't apply |
| `signals-scout-experiments` | No active A/B experiments |
| `signals-scout-customer-analytics` | No group/accounts analytics (B2B) |
| `signals-scout-data-pipelines` | No CDP destinations or batch exports configured |
| `signals-scout-logs` | PostHog logs product not in use |
| `signals-scout-csp-violations` | Mobile app — no Content Security Policy |
| `signals-scout-apm` | No OpenTelemetry/distributed tracing |
| `signals-scout-conversations` | No support conversations data yet (re-enable if you connect a support channel) |
| `signals-scout-data-warehouse` | No data warehouse sources connected |
| `signals-scout-replay-vision` | No Replay Vision observations yet (scanners just created — re-enable once observations accumulate) |
| `signals-scout-anomaly-detection` | Deprioritized — `general` covers cross-product anomalies at this scale |
| `signals-scout-observability-gaps` | Deprioritized — useful later once more insights/dashboards exist |
| `signals-scout-inbox-validation` | Fresh setup — no resolved reports to validate yet |
| `signals-scout-insight-alerts` | No insight alerts configured |
| `signals-scout-mcp-tool-calls` | Not relevant for this product |
| `signals-scout-skills-store` | Not relevant for end-user projects |
| `signals-scout-tasks` | Deprioritized at this stage |

---

## Custom scouts

**Proposed:** 2 (subscription engagement, auth health)  
**Outcome:** Declined by user (selection cancelled)

**Gap analysis:**
- **Subscription engagement** (`subscription_card_expanded` + `subscription_viewed`) — clear discriminator, uncovered by built-in troop (product-analytics watches saved funnel insights, none exist yet). Proposed but declined.
- **Auth health** (`sign_in_failed` + `user_signed_in`) — manual events, not `$exceptions`, so error tracking won't surface them. Proposed but declined.
- **Onboarding** — ruled out: `app/onboarding.tsx` exists but no onboarding-specific events found; can't name a reliable discriminator.
- **App lifecycle drops** — ruled out: too generic; covered broadly by `general` scout.

If you want to re-add these scouts later, you can create them from the inbox or re-run this setup flow.

**Noise escape hatch:** To switch any scout to dry-run (runs but writes nothing to the inbox), set `emit: false` on its config in PostHog.

---

## Replay Vision scanners

Replay Vision scanners are LLMs that watch individual session recordings on a schedule and push what they find directly to the Self-driving inbox. Findings arrive at **half weight**; a report is promoted at full weight, requiring corroboration from two different sessions — this prevents a single noisy recording from flooding the inbox. Scanners are the only component in this setup that spend Replay Vision credits.

No recordings exist yet (this is a fresh project). Both scanners are armed and will start working the day recordings begin — no second setup needed.

**Mobile app note:** This is a React Native/Expo app. Replay Vision was designed primarily for web recordings. The `$rageclick` event and `$current_url` URL-based filtering may behave differently on mobile recordings. If either scanner produces no observations once recordings start, check whether mobile session replay is capturing those events.

| Scanner | Type | Query scope | Sampling | Model | Monthly credits (est.) | Status |
|---|---|---|---|---|---|---|
| Subscription screens breakage | monitor | Sessions with "subscriptions" in `$current_url` | 50% | gemini-3-flash-preview | 0 (no recordings yet) | **Created** — signals on |
| Recurrly user frustration | monitor | Sessions with `$rageclick` events | 100% | gemini-3-flash-preview | 0 (no recordings yet) | **Created** — signals on |

**Breakage monitor** watches for: subscription list failing to load, subscription cards showing no name/amount/date, subscription detail page empty, sign-in form stuck, balance card blank.

**Frustration monitor** watches for: repeated taps on unresponsive subscription cards, sign-in button hammering, form retry loops, add-icon tapping without response, subscription detail abandonment.

Credit spend was not estimated — the in-product sizing skill (`creating-replay-vision-scanners`) was not available on this deploy. At the default sample rates for a bounded monitor brief, spend is expected to be a small fraction of the org budget. Review [Replay Vision settings](https://us.posthog.com/project/577799/replay-vision) once recordings start to verify.

---

## Follow-ups

- [ ] **Enable mobile session replay in the SDK** — add `enableSessionRecording: true` (or the equivalent option in `posthog-react-native`) to the PostHog client init in `src/config/posthog.ts`. The server toggle is on; recordings won't arrive until the SDK is also configured.
- [ ] **Enable exception capture in the SDK** — integrate `posthog-react-native`'s error tracking / exception capture so `$exception` events flow in. Without this, `sign_in_failed` events (which are manually captured custom events) are the only error signal in the inbox.
- [ ] **Connect a Support inbound channel** — go to PostHog → Support to connect an email address, Slack channel, or inbox so the `conversations/ticket` source starts receiving tickets. The source row is enabled and will pick up tickets automatically once a channel exists.
- [ ] **Verify Replay Vision scanner scope on mobile** — once recordings start arriving, check whether the breakage monitor (`$current_url icontains subscriptions`) and frustration monitor (`$rageclick`) are matching sessions. Mobile recordings may not emit these events; adjust queries if needed via the [Replay Vision page](https://us.posthog.com/project/577799/replay-vision).
- [ ] **Save funnel insights** to unlock the product-analytics scout — create a PostHog funnel insight covering the sign-up → sign-in → subscriptions home flow. The `signals-scout-product-analytics` scout watches saved flows; without a saved funnel, it will scan broadly.
- [ ] **Enable `signals-scout-conversations`** in PostHog once a support channel is connected and ticket data starts arriving.
- [ ] **Enable `signals-scout-replay-vision`** once Replay Vision observations have accumulated (typically after a few days of recordings).

---

## What happens next

1. The scout coordinator picks up fresh configs within **~30 minutes** and fires the first runs.
2. Each enabled scout draws from the project's daily budget (100 runs/day during early access).
3. Findings cluster into reports in the [inbox](https://us.posthog.com/project/577799/inbox).
4. Immediately-actionable reports can start coding tasks automatically.
5. Replay Vision scanner observations begin the moment mobile session replay recordings arrive.
