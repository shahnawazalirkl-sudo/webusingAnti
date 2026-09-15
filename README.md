# ✨ ASRA Wedding Canvas

> **Customized Wedding Gifts & Bridal Luxuries**  
> An editorial, luxury bridal e-commerce experience offering customized wedding gifts, customized crafts, and heirlooms.

---

## 🌟 Overview

**ASRA Wedding Canvas** is a modern full-stack web application designed with an elevated editorial aesthetic. It features immersive typography, seamless cart and checkout workflows, interactive product displays, and dedicated experiences for personalized gifts, bulk bridal party gifting, and real-time order tracking.

---

## 🏗️ Repository Architecture

This project is organized as a unified full-stack monorepo:

```text
webusingAnti/
├── .gitignore              # Global git exclusions (node_modules, .env, build outputs)
├── README.md               # Project documentation
│
├── Frontend/               # React + Vite client application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Modals, etc.)
│   │   ├── context/        # React context providers (Cart, Wishlist, etc.)
│   │   ├── data/           # Mock data and catalog definitions
│   │   ├── pages/          # Full page views
│   │   │   ├── HomePage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── WeddingKeepsakesPage.jsx
│   │   │   ├── BespokePage.jsx
│   │   │   ├── PersonalizedPage.jsx
│   │   │   ├── CollectionsPage.jsx
│   │   │   ├── BulkOrdersPage.jsx
│   │   │   ├── OffersPage.jsx
│   │   │   ├── WishlistPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   ├── TrackOrderPage.jsx
│   │   │   └── ReturnPolicyPage.jsx
│   │   ├── App.jsx         # Routing and layout structure
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── Backend/                # Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   └── routes/         # API endpoints
│   ├── .env.example        # Environment variable template
│   ├── package.json
│   └── server.js           # Server entry point & CORS configuration
│
└── designs/                # Standalone UI reference mockups & Stitch screens
    ├── cart_bag_screen.html
    ├── confirmation_screen.html
    ├── raw_stitch_screen.html
    ├── return_policy_stitch.html
    ├── track_my_order_stitch.html
    └── wishlist_stitch.html
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [Google Material Symbols](https://fonts.google.com/icons)
- **3D & Canvas Effects:** [Three.js](https://threejs.org/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Typography:** Playfair Display, Cormorant Garamond, Cinzel, Alex Brush, Plus Jakarta Sans

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework:** [Express.js](https://expressjs.com/)
- **Middleware:** `cors`, `dotenv`
- **Development Tool:** `nodemon`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

---

### 1. Frontend Setup

1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.

---

### 2. Backend Setup

1. Open a separate terminal and navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Start the backend in development mode (with hot reloading):
   ```bash
   npm run dev
   ```
5. Verify the backend is active at `http://localhost:5000/api/health`.

---

## 📦 Key Pages & Features

| Page / Feature | Description |
| :--- | :--- |
| **Home (`/`)** | Hero editorial visuals, featured collections, bride stories, and craft highlights. |
| **Shop (`/shop`)** | Catalog with filters for bridal gifts, fabrics, embroidery, and custom items. |
| **Product Detail** | High-resolution galleries, customization pickers, and gift specifications. |
| **Customized & Gifts** | Specialized consultation and custom design request workflows. |
| **Wishlist & Cart** | Interactive item management, bag breakdown, and pricing calculator. |
| **Checkout & Confirmation** | Multi-step shipping, payment selection, and instant order confirmation. |
| **Track Order** | Live status lookups with delivery timeline breakdown. |
| **Designs Folder** | Raw HTML design system references and Stitch exports. |

---

## 🌐 Deployment Guidelines

- **Frontend:** Can be deployed to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Firebase Hosting](https://firebase.google.com/docs/hosting) by setting the root directory to `Frontend` with build command `npm run build` and output directory `dist`.
- **Backend:** Can be deployed to [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://www.heroku.com/) by setting the root directory to `Backend` with start command `node server.js`.

---

## 📄 License

This project is licensed under the ISC License.
