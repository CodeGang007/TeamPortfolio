Portfolio (TeamPortfolio)

A high-performance, interactive portfolio website built with **Next.js**, **NextUI**, and **Framer Motion**.  
Featuring a 3D magnetic hero section, glassmorphism aesthetics, and a smooth side-drawer navigation.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)
![NextUI](https://img.shields.io/badge/NextUI-2.0-0072F5)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple)

---

## 🚀 Features

*   **3D Magnetic Hero:** Interactive card that follows mouse movement with 3D perspective and parallax depth.
*   **Glassmorphism UI:** Modern frosted glass effects using backdrop-blur.
*   **Smooth Animations:** Powered by Framer Motion (Spring physics, exit transitions).
*   **Side Drawer Navigation:** Accessible, animated off-canvas menu.
*   **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.
*   **Dark Mode:** Built with a dark-first aesthetic.

---

## 🛠 Tech Stack

*   **Framework:** [Next.js (App Router)](https://nextjs.org/)
*   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) & [NextUI](https://nextui.org/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Environment:** Windows Subsystem for Linux (WSL 2)

---

## 📂 Project Structure

Code is organized inside the `src` folder for a clean root directory.

    TeamPortfolio/
    ├── public/              # Static assets (images, fonts)
    ├── src/
    │   ├── app/             # Next.js App Router pages
    │   │   ├── layout.tsx   # Root layout (Providers included here)
    │   │   ├── page.tsx     # Main Landing Page
    │   │   └── globals.css  # Global styles (Tailwind directives)
    │   ├── components/      # Reusable UI Components
    │   │   ├── FloatingHero.tsx  # 3D Mouse-tracking Hero
    │   │   ├── SideDrawer.tsx    # Navigation Menu
    │   │   └── Navigation.tsx    # (Optional) Top Navbar
    │   └── lib/             # Utility functions
    ├── .gitignore
    ├── next.config.js
    ├── tailwind.config.js   # Configured for NextUI & Tailwind v3
    └── tsconfig.json

---

## ⚡ Getting Started

### Prerequisites
*   Node.js (LTS version recommended) installed via NVM.
*   WSL 2 (if on Windows) is recommended for best performance.

### Installation

1.  **Clone the repository:**

        git clone https://github.com/your-username/TeamPortfolio.git
        cd TeamPortfolio

2.  **Install dependencies:**

        npm install

3.  **Run the development server:**

        npm run dev

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌿 Branching Strategy

We follow a 3-branch workflow to ensure code stability.

| Branch | Role | Description |
| :--- | :--- | :--- |
| **`dev`** | Development | **Work here.** All new features and commits go here first. |
| **`qa`** | Testing | Merge `dev` into `qa` for final testing before release. |
| **`main`** | Production | Stable code only. Deployed to the live website. |

**Workflow:**
1.  Checkout dev: `git checkout dev`
2.  Write code & commit.
3.  Push to remote: `git push origin dev`
4.  Create Pull Request to merge `dev` → `qa`.

---

## ⚠️ Troubleshooting / Notes

### Tailwind CSS Version
This project uses **Tailwind CSS v3** to ensure compatibility with NextUI.
*   *Do not upgrade to Tailwind v4* unless NextUI releases official support.
*   If you see `Cannot find module`, ensure your `tailwind.config.js` uses `module.exports` syntax (CommonJS).

### Hydration Errors
If you see a "Hydration Mismatch" error in the console, it is likely caused by browser extensions (like Grammarly) injecting code into the HTML body.
*   **Fix:** The `<body suppressHydrationWarning>` tag has been added to `layout.tsx` to prevent these warnings.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).