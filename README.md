# Building Management System - Frontend

## 📋 Project Overview
**ResiFlow** - A robust and user-friendly Building Management System (BMS) designed to streamline apartment renting and management for users, members, and admins.

**Live Site:** [https://resiflow.surge.sh/](https://resiflow.surge.sh/)

## 🔑 Admin Credentials
- **Email**: `mess@sess.com`
- **Password**: `Mess@123`

## 💡 Key Features
- 🏠 **Responsive Design**: Fully responsive across mobile, tablet, and desktop.
- 🔒 **Authentication**: Email/password login and Google/GitHub social login.
- 📊 **Role-Based Dashboards**: Separate dashboards for users, members, and admins.
- 🏢 **Apartment Listings**: Browse apartments with pagination and search by rent range.
- 📝 **Agreement System**: Users can apply for apartment agreements with status tracking.
- 💳 **Payment Integration**: Members can make rent payments with coupon discounts.
- 📢 **Announcements**: View important updates and announcements.
- 📁 **State Management**: Integrated with TanStack Query for optimized data fetching (GET only).
- 🎨 **Dynamic UI**: banner slides, fancy sections, and SweetAlert/Toast notifications.
- 🗺️ **Location Details**: Embedded map showcasing apartment locations.
- ⚙️ **Secure Configurations**: Firebase and MongoDB credentials secured via environment variables.

## 🛠️ Tech Stack
- **Frontend**: Vite, React, Tailwind CSS, DaisyUI
- **Routing**: React Router
- **State Management**: TanStack Query
- **Authentication**: Firebase Auth
- **Notifications**: SweetAlert/Toast
- **Animations**: Animate.css

## 📦 NPM Packages Used
- firebase
- pigeon-maps
- react-router-dom
- tailwindcss | daisyui
- @tanstack/react-query | axios
- sweetalert2 | sonner | react-tooltip | reoverlay
- lucide-react | react-ts-typewriter | react-countup 
- react-intersection-observer | animate.css | react-loading-indicators | react-flip-toolkit
- react-range-slider-input | reactive-button | react-dropzone | react-textarea-autosize | copy-to-clipboard



## ⚡ Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mes-shahadat/b10a12-client-side.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd b10a12-client-side
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables (i.e. .env.local):**
   ```bash
    VITE_apiKey=From_Firebase_configuration
    VITE_authDomain=From_Firebase_configuration
    VITE_projectId=From_Firebase_configuration
    VITE_storageBucket=From_Firebase_configuration
    VITE_messagingSenderId=From_Firebase_configuration
    VITE_appId=From_Firebase_configuration
    VITE_server_endpoint=your_backend_server_endpoint
    VITE_imgbb_endpoint=https://api.imgbb.com/1/upload?key=your_API_key
    VITE_MAPTILER_API_KEY=your_maptiler_API_key
    VITE_Publishable_key=Stripe_pk
   ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```

