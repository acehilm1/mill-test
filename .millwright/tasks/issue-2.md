# You are implementing a single GitHub issue inside this repo. Do exactly what is described, nothing more.

      # The Issue

      **Title:** setup

      **Body:**
      create me a webpage using next.js with awesome styling with smooth scrolled trigger animation, later it will be deployed to vercel

      # Requirements Analysis (from the upstream Requirements Agent)

      {
  "edgeCases": [
    "User has prefers-reduced-motion enabled - animations should be minimized or disabled",
    "Very long pages with many animation triggers - ensure performance stays smooth",
    "Slow network/device - animations should not block content rendering (graceful degradation)",
    "Elements already in viewport on initial load should animate correctly without requiring scroll",
    "Browser without Intersection Observer support (very old browsers) - consider polyfill or fallback",
    "Scrolling back up through previously animated elements - decide on animation replay behavior",
    "Multiple rapid scroll events - debounce/throttle for performance",
    "Hydration mismatch between SSR and client when using animation libraries",
    "Image-heavy VR headset content (high-res product shots, 360° views) - lazy load to avoid CLS",
    "Window resize during scroll-triggered animations - recalculate trigger positions",
    "Touch/mobile devices have no hover or fine pointer - mouse-follow and hover effects must degrade gracefully",
    "Backend API routes receiving malformed/malicious payloads - validate and sanitize inputs",
    "Backend API routes failing under load or external service downtime - implement error handling and timeouts",
    "Large VR product videos/media - must lazy load and use streaming formats"
  ],
  "riskLevel": "medium",
  "requirements": [
    "Initialize a Next.js project within the existing mill-test repository",
    "Use Next.js App Router (recommended modern approach) with React 18+",
    "Set up TypeScript for type safety (confirmed)",
    "Use Tailwind CSS for styling (confirmed)",
    "Build a product showcase webpage specifically for a VR headset (theme confirmed)",
    "Implement an Apple-like visual design aesthetic: minimalist layout, generous whitespace, large hero typography, refined typography hierarchy, subtle gradients/blur, premium imagery, and cinematic product reveals",
    "Build a multi-section page (with routing support) including all standard sections: hero, features, about/specs, gallery, contact, and footer",
    "Add smooth scroll-triggered animations - developer has discretion to choose the best library (Framer Motion, GSAP ScrollTrigger, or Intersection Observer)",
    "Animations must trigger on scroll into viewport and animate smoothly (fade-in, slide-up, scale, stagger effects)",
    "Implement as much interactivity as possible: hover effects, parallax scrolling, mouse-follow/cursor effects, magnetic buttons, animated gradients, and 3D-tilt cards",
    "Include a backend with Next.js API routes (e.g., /api/contact, /api/products) - implementation details TBD",
    "Set up a CI/CD pipeline (GitHub Actions recommended) for linting, type-checking, testing, and build verification",
    "Configure project for seamless deployment to Vercel with generic config (account/team details configured later)",
    "Ensure full responsiveness across mobile, tablet, and desktop breakpoints",
    "Add a proper README.md with setup, development, build, deployment, and CI/CD instructions",
    "Ensure accessibility compliance (semantic HTML, aria attributes, reduced motion support) - no specific WCAG level required, follow standard best practices",
    "Optimize for performance (lazy loading, image optimization via next/image, font optimization via next/font)"
  ],
  "openQuestions": [
    "What backend functionality is required? (e.g., contact form submission, newsletter signup, product catalog API, analytics ingestion, authentication)",
    "What backend storage/persistence is needed? (e.g., database like Postgres/MongoDB, third-party service like SendGrid/Resend, or stateless API)",
    "What VR headset product details should be featured? (name, specs, pricing, imagery, copy - are assets provided or do they need to be sourced/generated?)",
    "Which CI provider should be used? (GitHub Actions assumed - confirm or specify alternative like Vercel CI, CircleCI)",
    "What should the CI pipeline gate? (lint, type-check, test, build, deploy on merge to main?)",
    "Should the VR headset showcase include any 3D model/WebGL/Three.js content (e.g., a rotatable product viewer) or remain 2D imagery?",
    "Are there any required third-party integrations? (analytics, marketing pixels, CRM, payment, etc.)"
  ],
  "securityRisks": [
    "External animation libraries (Framer Motion, GSAP) are reputable but introduce supply chain risk - pin exact versions and audit",
    "If using GSAP premium plugins, ensure licensing compliance for production use",
    "Server-side rendering may expose any secrets accidentally placed in client code - keep .env files properly scoped (NEXT_PUBLIC_ prefix only for public values)",
    "Backend API routes expand the attack surface - implement input validation, rate limiting, and authentication where applicable",
    "Contact form / user input endpoints must implement CSRF protection, input sanitization, and spam prevention (e.g., honeypot or captcha)",
    "Vercel deployment exposes the site publicly - ensure no debug endpoints, dev tools, or unprotected admin routes are left enabled in production",
    "Content Security Policy headers should be configured to mitigate XSS if user-generated content is rendered",
    "Dependency vulnerabilities - run `npm audit` regularly and keep dependencies updated; CI should run audits on PRs",
    "CI/CD pipeline secrets (e.g., deploy tokens) must be stored in GitHub Actions secrets, never committed",
    "Backend endpoints may inadvertently leak product/internal data - implement proper authorization checks"
  ],
  "filesToNotTouch": [],
  "acceptanceCriteria": [
    "Project builds successfully with `npm run build` with no errors",
    "Dev server runs with `npm run dev` and serves the page on localhost:3000",
    "Page renders correctly in modern browsers (Chrome, Firefox, Safari, Edge)",
    "Page is a VR headset product showcase with Apple-like design aesthetic (clean, minimal, premium feel, large hero typography)",
    "Multi-section layout includes hero, features, specs/about, gallery, contact, and footer sections",
    "Scroll-triggered animations activate when elements enter the viewport while scrolling",
    "Advanced interactivity is present: hover effects, parallax, mouse-follow/cursor effects",
    "Backend API routes exist under /api/* and respond with correct status codes and JSON payloads",
    "Animations are smooth (60fps target) without jank or stuttering",
    "Layout is fully responsive at breakpoints: 320px, 768px, 1024px, 1440px",
    "Respect prefers-reduced-motion media query - disable/simplify animations for users who request it",
    "Mouse-follow and parallax effects gracefully degrade on touch/mobile devices",
    "Project passes basic linting (ESLint) without errors",
    "CI/CD pipeline runs on push/PR via GitHub Actions: installs deps, lints, type-checks, and builds successfully",
    "vercel.json exists (or project is vercel-ready by default) and `vercel deploy` succeeds from CLI",
    "README.md documents installation, scripts, tech stack, backend API endpoints, CI/CD, and deployment steps",
    "Lighthouse score targets: Performance >= 90, Accessibility >= 90, Best Practices >= 90, SEO >= 90"
  ],
  "filesLikelyToCreate": [
    {
      "path": "package.json",
      "reason": "Define project dependencies (Next.js, React, Framer Motion or GSAP, Tailwind, TypeScript) and npm scripts"
    },
    {
      "path": "next.config.js",
      "reason": "Next.js configuration file for build settings, image domains (for VR product imagery), and any experimental features"
    },
    {
      "path": "tsconfig.json",
      "reason": "TypeScript configuration for the Next.js project"
    },
    {
      "path": "tailwind.config.ts",
      "reason": "Tailwind CSS configuration with custom theme tokens tuned for an Apple-like aesthetic (spacing scale, typography, colors, blur utilities)"
    },
    {
      "path": "postcss.config.js",
      "reason": "PostCSS configuration required by Tailwind CSS"
    },
    {
      "path": "vercel.json",
      "reason": "Vercel deployment configuration (optional, for redirects/headers/build settings) - generic setup, account/team details to be added later"
    },
    {
      "path": ".github/workflows/ci.yml",
      "reason": "GitHub Actions CI/CD pipeline that runs lint, type-check, build, and optionally deploy on push/PR"
    },
    {
      "path": "app/layout.tsx",
      "reason": "Root layout component wrapping all pages, includes global fonts (e.g., Inter/SF-style) and metadata for the VR headset showcase"
    },
    {
      "path": "app/page.tsx",
      "reason": "Main landing page composing all sections (hero, features, specs, gallery, contact, footer) with scroll-triggered animations"
    },
    {
      "path": "app/globals.css",
      "reason": "Global stylesheet with Tailwind directives and base resets"
    },
    {
      "path": "app/components/Hero.tsx",
      "reason": "Hero section with large product imagery, headline, and entrance animations for the VR headset"
    },
    {
      "path": "app/components/Features.tsx",
      "reason": "Features grid showcasing VR headset capabilities with staggered reveal animations"
    },
    {
      "path": "app/components/Specs.tsx",
      "reason": "Specs/about section with scroll-reveal animations detailing VR headset technical details"
    },
    {
      "path": "app/components/Gallery.tsx",
      "reason": "Product gallery section with hover/zoom effects on VR headset imagery"
    },
    {
      "path": "app/components/Contact.tsx",
      "reason": "Contact section with form that POSTs to backend API route"
    },
    {
      "path": "app/components/Footer.tsx",
      "reason": "Footer section with scroll-triggered reveal"
    },
    {
      "path": "app/components/Section.tsx",
      "reason": "Reusable section wrapper that applies scroll-triggered reveal animations"
    },
    {
      "path": "app/components/AnimatedText.tsx",
      "reason": "Text component with stagger/word-by-word scroll animation for cinematic Apple-style headlines"
    },
    {
      "path": "app/components/MouseFollow.tsx",
      "reason": "Cursor/mouse-follow effect component (with touch-device fallback)"
    },
    {
      "path": "app/components/Parallax.tsx",
      "reason": "Parallax wrapper component for scroll-driven depth effects"
    },
    {
      "path": "app/hooks/useScrollAnimation.ts",
      "reason": "Custom hook wrapping Intersection Observer or Framer Motion useInView for consistent scroll animations across components"
    },
    {
      "path": "app/api/contact/route.ts",
      "reason": "Backend API route handling contact form submissions with validation"
    },
    {
      "path": "app/api/products/route.ts",
      "reason": "Backend API route serving VR headset product data (or stub for catalog)"
    },
    {
      "path": "app/api/health/route.ts",
      "reason": "Backend health-check endpoint useful for CI/CD smoke tests"
    },
    {
      "path": "app/lib/validation.ts",
      "reason": "Shared server-side input validation utilities (e.g., zod schemas) for API routes"
    },
    {
      "path": "app/lib/rateLimit.ts",
      "reason": "Simple in-memory or edge-compatible rate limiter for backend API routes"
    },
    {
      "path": ".gitignore",
      "reason": "Standard Next.js gitignore (node_modules, .next, .env*.local)"
    },
    {
      "path": ".eslintrc.json",
      "reason": "ESLint configuration for Next.js/TypeScript linting"
    },
    {
      "path": ".env.example",
      "reason": "Example environment variables file documenting backend secrets (DB URLs, email API keys)"
    }
  ],
  "filesLikelyToModify": [
    {
      "path": "README.md",
      "reason": "Replace placeholder content with proper documentation of the Next.js project setup, scripts, backend API endpoints, CI/CD pipeline, and deployment instructions for the VR headset showcase"
    }
  ]
}

      # Hard Rules

      - Make minimal changes. Edit only files needed to implement the requirement.
      - Do NOT commit. The harness will commit.
      - Run `npm typecheck` and `npm test` before you finish. Both MUST pass.
      - Add tests covering the new behavior. For every behavior change, write tests for:
          • Happy path — the main user journey
          • Boundary values — empty, zero, negative, max, min, very long
          • Type coercion — string vs number, NaN, undefined, null, empty array, mixed
          • Failure modes — invalid input, missing auth, expired session, network timeout
          • Concurrency / race conditions — two requests at the same time, mid-operation interruption
          • State transitions — before, during, after; partial state; rollback
          • Idempotency — calling twice produces the same result; replay protection
          • Auth boundaries — anonymous, wrong role, scope mismatch, token expiry
          • Encoding — Unicode, emoji, special characters, very long strings
          • Error propagation — does the error bubble up, or get swallowed?
        For each test, ask: "What would a careless or adversarial user do to break this?" A real user hitting a non-obvious bug should make the suite fail.
      - If you cannot make both pass in 40 tool turns, stop and explain what's blocking you.
      - Keep the diff small. Resist scope creep.