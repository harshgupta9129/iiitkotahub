# 🎓 IIIT Kota 
A high-performance, responsive web portal designed for students of the **Indian Institute of Information Technology, Kota**.  
This application streamlines the academic tracking process by providing **accurate SGPA (Semester Grade Point Average) calculations** based on the official institute ordinance.

---

## ✨ Key Features

- **Institutional Accuracy**  
  Pre-configured with official course credits for **CSE** and **IT** branches.

- **Glassmorphism Design**  
  Futuristic *Space-Tech* UI using backdrop blurs, gradients, and purple/indigo glows.

- **Mobile-Optimized UX**  
  Professionally designed navigation and inputs that scale from mobile devices to 4K desktops.

- **Reactive Calculation Engine**  
  Real-time SGPA updates without page reloads using React state management.

- **Smooth Transitions**  
  Fluid page animations powered by **Framer Motion (AnimatePresence)**.

---

## 🛠️ Tech Stack

| Category | Technology | Usage |
|--------|-----------|-------|
| **Framework** | React.js (Vite) | High-speed UI rendering |
| **Styling** | Tailwind CSS v4 | Utility-first styling with glassmorphism |
| **Animations** | Framer Motion | Page transitions and interactions |
| **Icons** | Lucide React | Clean SVG icon set |
| **Routing** | React Router v6 | Client-side routing |

---

## 🏛️ Project Architecture

```text
src/
├── assets/                  # Institute logos and static assets
├── components/              # Reusable UI components
│   ├── Navbar.jsx           # Responsive navbar with mobile drawer
│   ├── Footer.jsx           # Institutional footer
│   ├── Home.jsx             # Landing page & features
│   ├── SgpaCalculator.jsx   # Core SGPA calculation logic
│   └── Stepper.jsx          # Step-based progress tracker
├── data/
│   └── SgpaData.js          # Subjects, codes, and credit structure
├── utils/
│   └── gradeMap.js          # Letter grade to grade-point mapping
├── App.jsx                  # Route definitions & transitions
└── index.css                # Global styles & Tailwind configuration
📥 Getting Started
