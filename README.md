# ICAST Website & Admin Portal

A modern web platform for managing ICAST competition registrations, hero content, mentors, prizes, timelines, FAQs, and application settings. Built with **Laravel 13**, **Inertia.js**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🛠 Tech Stack

- **Backend**: PHP 8.3+ / Laravel 13
- **Frontend**: React 19, Inertia.js v2, TypeScript, Tailwind CSS v4
- **Database**: MySQL / SQLite (configurable in `.env`)
- **Build Tool**: Vite 6

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Ensure you have the following installed on your development machine:
- **PHP** >= 8.3
- **Composer** >= 2.0
- **Node.js** >= 20.x & **npm**

---

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zroik/icast.git
   cd icast
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment File**
   ```bash
   cp .env.example .env
   ```
   *Configure your database credentials inside `.env` if necessary.*

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Run Database Migrations & Seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Create Storage Link** (if using media uploads)
   ```bash
   php artisan storage:link
   ```

---

## 💻 Running Locally

You can launch both the backend server and frontend Vite development server concurrently using composer:

```bash
composer run dev
```

Alternatively, run them in separate terminal tabs:

**Terminal 1 (Laravel Server):**
```bash
php artisan serve
```

**Terminal 2 (Vite Server):**
```bash
npm run dev
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev` – Starts Vite development server.
- `npm run build` – Builds production assets.
- `npm run type-check` – Runs TypeScript type check.
- `composer run setup` – Automated project setup script.
- `composer run dev` – Runs Laravel server, Queue listener, Pail logs, and Vite concurrently.

---

## 📄 License

This project is open-source software licensed under the [MIT license](LICENSE).
