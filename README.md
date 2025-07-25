# Stack overflow copy

It is a front-end application with a modular architecture that includes reusable UI components, a built-in code editor, and a flexible form of validation.

## Installation

<pre>
yarn install
</pre>

### Development Server
Start the development server on http://localhost:5173:
<pre>
yarn dev
</pre>

## Tech Stack 

  <br/>

- **React 19** and **TypeScript 5.8** – foundation for scalable SPA
- **Vite 7** – fast development and build tool
- **Redux Toolkit** & **RTK Query** – state management and API caching
- **React Router DOM** – declarative routing
- **React Hook Form** + **Zod** – schema-based validation
- **Monaco Editor** – embedded code editing
- **MUI** + **Emotion** – UI components and styling framework
- **usehooks.dev** – reusable utility hooks

<details>
  <summary>📁 Project Architecture</summary>

  <pre>
├── main.tsx               # Entry point
├── vite.config.ts
├── app/                   # Root component and Redux store
│   ├── App.tsx
│   └── store.ts
├── modules/               # Business logic split into domains
│   ├── auth/
│   │   ├── model/
│   │   └── ui/
│   ├── comments/
│   │   ├── model/
│   │   └── ui/
│   └── ...                # Additional feature modules
├── pages/                 # Route-matched components
│   └── HomePage/
│       └── index.tsx
└── shared/                # Reusable resources and utilities
    ├── api/               # Base query setup for RTK Query
    ├── assets/            # Icons and images
    ├── constants/         # Global constants (e.g. navigation)
    ├── enums/             # TypeScript enums
    ├── hooks/             # Custom hooks for state/UI logic
    ├── routing/           # Routing components and config
    ├── schemas/           # Zod schemas for validation
    ├── ui/                # Universal UI components
    └── utils/             # Utility functions
        ├── handleError/
        ├── protected-action/
        └── protected-route/
  </pre>
</details>
