# PRD — Project Requirements Document

**Location:** Place at `.claude/PRD.md` or `PRD.md` in your project root

**Purpose:** Comprehensive project specification. Claude reads this for context. Humans read this to understand scope.

---

## Project Overview

**[Project Name]**

[One sentence: What does this project do?]

[2-3 sentences: Who is it for? What problem does it solve?]

---

## Problem Statement

What problem are we solving? Why does it matter?

[Explain the pain point or opportunity]

---

## Target User / Customer

- **Who are they?** [Description of primary users]
- **What do they need?** [Core needs this project addresses]
- **Current workflow:** [How do they work today, before this solution?]

---

## Core Features (3-5)

Define the essential features needed for launch:

1. **[Feature Name]** — [1-sentence description of what it does]
2. **[Feature Name]** — [1-sentence description]
3. **[Feature Name]** — [1-sentence description]
4. **[Feature Name]** — [1-sentence description]
5. **[Feature Name]** — [1-sentence description]

---

## Out of Scope

Features we're NOT building (yet):

- [Feature or enhancement we explicitly won't do]
- [Feature we're deferring to v2]
- [Anything that's tempting but not critical]

---

## Success Metrics

How do we know this project is successful?

- [ ] [Metric 1] — e.g., "Users can register and log in in under 2 minutes"
- [ ] [Metric 2] — e.g., "Page load time under 2 seconds"
- [ ] [Metric 3] — e.g., "Zero critical bugs before launch"

---

## Tech Stack

- **Frontend**: [React, Vue, Svelte, etc]
- **Backend**: [Node.js, Python, Go, etc]
- **Database**: [PostgreSQL, MongoDB, Supabase, etc]
- **Authentication**: [JWT, OAuth, Supabase Auth, etc]
- **Hosting**: [Vercel, AWS, Railway, etc]
- **Package Manager**: [npm, yarn, pnpm, bun]
- **Language/Runtime**: [Node v22+, Python 3.11+, Go 1.21+, etc]

---

## Secure Coding Principles (MANDATORY)

All code MUST follow secure coding practices. These are non-negotiable.

### Input Validation
- Validate ALL inputs at system boundaries (API endpoints, message consumers)
- Use Pydantic models with strict field constraints (min/max length, regex patterns)
- Never trust client-side validation alone

### Authentication & Authorization
- Verify auth on every endpoint (no endpoint should be accidentally public)
- Check resource ownership — prevent IDOR by verifying the requesting user owns/has access to the resource
- Use the principle of least privilege for all operations

### Data Protection
- Never log PII (emails, names, tokens) — use blind indexes or user IDs in logs
- Never return sensitive fields in API responses unless explicitly needed
- Use parameterized queries/expressions — never string-concatenate user input into queries
- Sanitize all user-provided data before storage

### Secrets Management
- Never hardcode secrets, API keys, or credentials
- Use SSM parameters or environment variables
- Never commit .env files or secret material

### Common Vulnerability Prevention
- **Injection**: Use parameterized DynamoDB expressions, never f-strings for queries
- **XSS**: Sanitize any user content that could be rendered
- **CSRF**: Validate origin headers on state-changing operations
- **Mass Assignment**: Use explicit Pydantic models, never pass raw dicts to DB operations
- **Rate Limiting**: Apply rate limits on auth endpoints and expensive operations

---

## Key File Locations

Quick reference for important files:

```
Entry Point:      [src/index.js or src/app.tsx]
API Routes:       [src/api/ or server/routes/]
Components:       [src/components/ or ui/]
Database Schema:  [supabase/migrations/ or db/schema.sql]
Tests:            [src/__tests__/ or test/]
Config:           [.env.example, package.json, tsconfig.json]
```

---

## Build & Development Commands

Essential commands to know:

```bash
# Install dependencies
[npm install / yarn install / pnpm install]

# Start development server
[npm run dev]
# Access at http://localhost:3000

# Run tests
[npm test]

# Run linting
[npm run lint]

# Build for production
[npm run build]

# Type check (if TypeScript)
[npm run type-check]
```

---

## Critical Setup Steps

What must be done before the project runs?

1. **[Step 1]** — [e.g., "Copy `.env.example` to `.env.local` and fill in Supabase credentials"]
2. **[Step 2]** — [e.g., "Run `npm run db:migrate` to set up database"]
3. **[Step 3]** — [e.g., "Create test user in authentication dashboard"]

---

## Database Schema (Quick Reference)

**Key Tables:**

```
Table: [table_name]
├── id (uuid, primary key)
├── [column_name] (type, constraints)
└── created_at (timestamp)

Table: [table_name]
├── id (uuid, primary key)
├── [foreign_key_to_other_table]
└── created_at (timestamp)
```

[Reference the full schema in your project if it's large]

---

## Deployment

### Development (Preview)
- [Auto-deploys on PR / Manual via CLI]
- [Preview URL pattern]

### Production (Live)
- [Manual deploy from main branch / Automatic on merge]
- [Requires code review: Yes/No]
- [Automated tests run: Yes/No]

**Deploy Command:**
```bash
[npm run build && npm run deploy]
```

---

## Common Gotchas

Things that have bitten us or could bite others:

- **[Gotcha 1]** — [Problem] → [How to fix]
- **[Gotcha 2]** — [Problem] → [How to fix]
- **[Gotcha 3]** — [Problem] → [How to fix]

Example:
- **Auth redirect loops** — Check that `NEXT_PUBLIC_SUPABASE_URL` is correct in `.env.local`

---

## Done When (Launch Checklist)

Project is complete when ALL of these are true:

- [ ] All core features implemented and tested
- [ ] No critical bugs in bug tracker
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review approved by tech lead
- [ ] Database migrations tested locally
- [ ] Environment variables documented in `.env.example`
- [ ] README.md is up-to-date
- [ ] Security audit passed (no exposed secrets)
- [ ] Performance meets success metrics
- [ ] Deployment to production successful
- [ ] Monitoring/logging in place
- [ ] User documentation complete (if applicable)

---

## Team & Contacts

- **Product Lead**: [Name] — [email]
- **Tech Lead**: [Name] — [email]
- **Design Lead**: [Name] — [email]
- **Slack Channel**: #[project-name]

---

## Useful Links

- [Project Documentation](link)
- [Design System / Figma](link)
- [Issue Tracker](link)
- [Architecture Diagram](link)
- [API Documentation](link)
- [Deployment Dashboard](link)

---

**Last Updated**: [Date]  
**Maintained By**: [Your name]  
**Status**: [Planning / In Progress / Ready for Launch / Live]

---

**Quick Reference**: Use this PRD when:
- You're unsure about what the project should do
- You need to understand scope boundaries
- You're evaluating whether something is in-scope or out-of-scope
- You want to know the success criteria
