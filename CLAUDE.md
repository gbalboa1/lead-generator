# CLAUDE.md — Global Rules
## Location: `~/.claude/CLAUDE.md`

Fill in `[bracketed]` fields. Delete anything that doesn't apply. Everything else is sensible defaults. Keep this file short — long CLAUDE.md files waste context and degrade results.

---

## About Me

- **Name**: [Your Name]
- **Role**: [Coach / Agency Owner / Developer / Solopreneur / Student / Other]
- **Coding experience**: [None / Beginner / Intermediate / Advanced]
- **Editor**: VS Code with Claude Code extension
- **Main projects**: [Websites, automations, apps, etc.]

---

## Core Operating Rules

These apply to every project, every session.

### Never without explicit approval:
- Install packages, dependencies, or CLIs
- Delete files or folders
- Edit more than one file per turn unless instructed
- Push, publish, or deploy to any remote (GitHub, Vercel, production)
- Add features not in the request

### Always:
- State the next action in one sentence before executing
- Make the smallest change that solves the problem
- Ask when intent is ambiguous — do not guess
- Verify the result after each change and report back
- Give me a way to verify your work (tests, screenshots, lint output, type-check) — use the feedback loop to iterate until it passes

### When things fail:
- Report the exact error and the likely cause
- Do not mask, swallow, or reroute around errors
- Propose one specific fix — not a menu

### Teach from mistakes
When you do something incorrectly and I correct you, add a rule to this CLAUDE.md (or the relevant project CLAUDE.md) so you don't repeat it.

---

## Permissions Mode

This setup runs Claude Code in **bypass permissions mode** (`--dangerously-skip-permissions`, or `permissions.defaultMode: bypassPermissions` in settings.json). Tool approval prompts are suppressed so work isn't interrupted every few seconds.

**The tradeoff:** with the permission layer off, Claude can execute any command without a prompt. The rules below are the safety net — Claude must follow them even though the harness would allow the action through.

**Student safety baseline** (keep these habits regardless of what Claude does):
- `git commit` frequently so there's always a recent restore point
- Only run Claude Code from inside the project directory — never from your home folder or drive root
- Review diffs before accepting large changes
- Keep important work backed up outside the repo

### Always stop and confirm before these — even in bypass mode

**File system**
- Deleting files or folders (`rm`, `rm -rf`, bulk deletes, recursive moves)
- Overwriting uncommitted changes
- Renaming or moving more than a handful of files at once

**Git / version control**
- `git reset --hard`, `git clean -f`, `git checkout -- .`
- Force-push (`--force`, `--force-with-lease`)
- Deleting branches (local or remote)
- Amending or rewriting published commits
- Pushing to `main` / `master` / `production`

**Dependencies**
- Installing, updating, or removing packages
- Modifying `package.json`, `requirements.txt`, or lockfiles
- Global installs (`npm i -g`, `pip install --user`, etc.)

**Deploys and shared state**
- Any deploy (`vercel deploy`, `npm publish`, Cloud Run pushes, etc.)
- Creating, merging, closing PRs or issues
- Sending messages through MCP (Slack, email, GitHub comments)
- Database writes, migrations, schema drops
- Modifying CI/CD pipelines, environment variables, or secrets
- Uploading files to any external service (Drive, S3, Vercel Blob, etc.)

**Rule of thumb:** if an action is **hard to reverse** or **affects state outside this machine**, stop and confirm. The absence of a permission prompt is not permission.

---

## Security — Non-Negotiable

- Never hardcode API keys, tokens, passwords, or secrets in any file — use `.env`
- `.env` must be in `.gitignore` before the first commit
- Never commit or push `.env`
- Never read `.env` unless explicitly authorized
- If you detect an exposed secret, stop and flag it

---

## Workflow

### Planning
- Enter Plan mode (`shift+tab` twice) for any non-trivial task
- Stay in Plan mode until the plan is approved, then switch to auto-accept edits
- Read `PRD.md` if present — that is the source of truth for the build
- GSD framework: Investigate → Plan → Store → Define Done → Build

### Building
- One concern at a time — finish before starting the next
- Report progress after each step, not only at the end
- Run `/review` before committing
- Use `/commit` for all commits (not raw `git commit`)
- Run lint, type-check, and tests after changes; fix failures before claiming done

### Communication
- Direct and concise — no filler, no hedging
- Explain WHY, not just WHAT
- If uncertain, say so — do not guess

---

## Coding Style

- **Primary language**: [JavaScript / TypeScript / Python / Other]
- **Indentation**: 2 spaces
- **Modules**: ES modules (`import`/`export`) — not CommonJS
- **Async**: `async/await` — not `.then()` chains
- **Naming**: Descriptive; single letters only for loop counters
- **Comments**: Only when the WHY is non-obvious — never restate the WHAT

---

## Tech Stack

- **Frontend**: [React / Next.js / plain HTML / Other]
- **Backend**: [Node.js / Python / Other]
- **Database**: [Supabase / Postgres / Other / None]
- **Hosting**: [Vercel / Other]

---

## Available Slash Commands

- `/kickoff [feature]` — plan a feature before building
- `/review` — pre-commit code review
- `/scaffold app` — new project scaffold
- `/scaffold agent` — new AI agent scaffold
- `/help` — help / next steps
- `/fix [error]` — diagnose and resolve a specific error
- `/commit` — create a git commit
- `/deploy` — deploy to Vercel

---

## Connected MCPs

- Context7 — official library documentation lookup
- Sequential Thinking — structured multi-step reasoning
- Tavily Search — live web search
- Playwright — browser automation, screenshots, form fills
- Memory — persistent context across sessions

*(Lessons 10–11 add: GitHub, Supabase, Vercel)*

---

## Definition of Done

A task is done when all of these hold:
1. Behavior matches the request
2. No console or terminal errors
3. `/review` passed
4. Tests pass (if any exist)
5. Change is committed via `/commit`

Do not report "done" until all five are true.

---

## Hard Prohibitions

- No features outside the request
- No multi-file edits without announcing them first
- No silent error recovery — stop and surface it
- No committing `.env`
- No installing packages without approval
- No destructive or irreversible action without confirmation, regardless of permission mode (see **Permissions Mode**)
- No assumptions — ask

---

*Template from the Claude Code Workshop.*
*Last updated: [Date]*
