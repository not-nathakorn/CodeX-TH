# Project Structure Guide

This project follows an industry-standard architecture adapted for a modern Vite + React + Supabase application. This ensures separation of concerns, maintainability, and scalability.

## 📂 Directory Structure

```plaintext
project-root/
├── .env                # Environment variables (Secrets - DO NOT COMMIT)
├── .github/            # GitHub Actions & Workflows
├── docs/               # 📚 Project Documentation, Guides, and Reports
├── public/             # Static assets (favicon, robots.txt)
├── scripts/            # 🛠 Maintenance & Utility Scripts
│   └── tools/          # HTML debuggers and generators
├── src/                # ⚛️ Source Code (Application Logic)
│   ├── components/     # UI Components (Presentational)
│   ├── config/         # App Configuration (Constants, Env validation)
│   ├── contexts/       # React Context Providers (Global State)
│   ├── hooks/          # Custom React Hooks (Reusable Logic)
│   ├── lib/            # External libraries/clients (Supabase, Utils)
│   │   └── supabase.ts # Database Connection
│   ├── pages/          # Route/Page Components
│   ├── services/       # 🧠 Business Logic (API Calls, calculations)
│   │   └── index.ts    # Barrel export
│   ├── types/          # TypeScript Interfaces & Types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main App Component
│   └── main.tsx        # Entry Point
└── package.json
```

## 🔍 Key Architecture Principles

### 1. Separation of Concerns (SoC)

- **Components (`src/components`)**: STRICTLY for UI rendering. Should not contain complex business logic or direct API calls if possible.
- **Services (`src/services`)**: The "Brain" of the application. Handles API requests, data transformation, and business rules. Components call Services, never the DB directly.
- **Lib (`src/lib`)**: Infrastructure code. Initializes clients (Supabase) and shared utilities.

### 2. Configuration Management

- **`src/config`**: Centralizes configuration. Accessing `import.meta.env` scattered across the app is discouraged.

### 3. Documentation & Scripts

- **`docs/`**: All technical reports, guides, and audit logs are stored here to keep the root clean.
- **`scripts/`**: Standalone scripts for maintenance (e.g., splash screen generation) that are not part of the runtime app bundle.

## 🚀 How to Scale

- **New Feature**:
  1. Define types in `src/types/`.
  2. Create business logic in `src/services/`.
  3. Create UI in `src/components/feature-name/`.
  4. Assemble in `src/pages/`.
- **Database Changes**: Update `src/types` to match new Supabase schema.

---

_Standards Implementation Update: Jan 2026_
