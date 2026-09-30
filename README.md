# 🚀 StartupForge — Startup Team Builder Platform

StartupForge is a centralized platform engineered to bridge the gap between startup founders and looking collaborators. Founders can establish their company profiles, launch project demands, and manage cross-functional recruitment workflows. Collaborators (developers, designers, marketers) can browse openings, apply to active teams, and manage their status portfolios.

---

## ✨ Key Features

### 💼 For Founders
- 🏢 **Create & Manage Startups:** Build comprehensive startup profiles complete with logo image uploads via ImgBB.
- 📋 **Opportunity Management:** Launch open role requests tailored with metadata parameters (Work Type, Skills, Commitments).
- 🤝 **Applicant Review System:** Assess applicant profiles directly with operational state pipelines (`Pending`, `Approved`, `Rejected`).
- 💳 **Stripe Payment Gateway:** Integrated monetization limits allowing up to 3 listings before requiring premium tier checkout activations.

### 🛠️ For Collaborators
- 🔍 **Elastic Opportunity Exploration:** Search and filter active opportunities by title, skills, or work type with fast server-side pagination.
- 📝 **Dynamic Application Portfolios:** Apply directly to matching startups with customized portfolio links and motivation notes.
- 📊 **Track Applications:** Monitor your personal processing status dashboard in real time.

### 🛡️ For Administrators
- 📈 **Platform Analytics:** Track operational platform statistics across total users, entity registrations, open positions, and total transaction revenues.
- ⚙️ **System Moderation Desk:** Secure controls to globally toggle visibility states of startups and enforce user block/unblock mechanics.

---

## 🔐 Authentication & Security

- 🔑 **Multi-Role RBAC Architecture:** Segregated dashboard layouts mapping individual spaces for Founders, Collaborators, and Admins.
- 🔐 **Better Auth Core Integration:** Secure cookie-based email/password credentials and direct Google OAuth provider strategies.
- 🛡️ **JWT Shield Protection:** Secure middleware-enforced validation pipelines serving protected data payloads over `HTTPOnly` custom cookies.

---

## 🎨 UI / UX Features

- ⚡ Built on **Next.js 15+ App Router** utilizing the fast **Turbopack Engine**.
- 🎨 Styled with **HeroUI (v3) + TailwindCSS** ensuring matching card heights and layout image grids.
- 📱 Fully responsive design optimized across mobile, tablet, and desktop interfaces.
- 🎬 Fluent dynamic interfaces featuring micro-interactions powered by **Motion (Framer Motion)**.

---

## 🛠️ Tech Stack Matrix

- **Frontend Framework:** Next.js 15+ (App Router)
- **Component System:** HeroUI & TailwindCSS
- **Animation Core:** Motion (Framer Motion)
- **Authentication Engine:** Better Auth & JSON Web Tokens (JWT)
- **Database Architecture:** MongoDB API Platform
- **Payment Processing:** Stripe Node SDK & Webhooks
- **Asset Storage CDN:** ImgBB API Core

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run StartupForge locally on your machine.

### 📋 Prerequisites

Make sure you have the following installed on your local environment:
- **Node.js:** v18.17.0 or higher
- **Package Manager:** `npm`, `yarn`, or `pnpm`
- **MongoDB Database:** A running local MongoDB instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL.

---

### 📥 Step-by-Step Installation

<Sequence>
  <Step title="Clone the Repository" subtitle="Terminal command">
    Get the source code onto your local machine:
    ```bash
    git clone https://github.com/fardinfaruk-bd/StartupForge-Next.git
    cd startupforge
    ```
  </Step>

  <Step title="Install Dependencies" subtitle="Package management">
    Install all required dependencies using your preferred package manager:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
  </Step>

  <Step title="Configure Environment Variables" subtitle="Root configuration">
    Create a `.env.local` file in the root directory of your project:
    ```bash
    cp .env.example .env.local # if you have an example file
    # or create a new .env.local file
    ```

    Add the following environment variables to your `.env.local` file:

    ```env
    # App Config
    NEXT_PUBLIC_APP_URL=http://localhost:3000

    # Database
    MONGODB_URI=your_mongodb_connection_string

    # Authentication (Better Auth & JWT)
    BETTER_AUTH_SECRET=your_better_auth_secret_key
    JWT_SECRET=your_jwt_secret_key

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # Stripe Payments
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

    # ImgBB API (Image Storage)
    IMGBB_API_KEY=your_imgbb_api_key
    ```
  </Step>

  <Step title="Run the Development Server" subtitle="Launch application">
    Start the Next.js development server using Turbopack:
    ```bash
    npm run dev
    ```

    Open http://localhost:3000 in your browser to see StartupForge live.
  </Step>
</Sequence>

---

### 🧪 Helpful Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server with Turbopack |
| `npm run build` | Builds the optimized production bundle |
| `npm run start` | Runs the built production application |
| `npm run lint` | Runs ESLint checks across project files |

## 👨‍💻 Author


Developed by **Md Fardin Faruk**


---



## ⭐ Support



If you like this project, don’t forget to give it a ⭐ on GitHub!
