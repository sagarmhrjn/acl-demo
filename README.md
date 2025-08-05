# 🔐 Angular Role & Permission Based Access Control System

This Angular project implements a **Role-Based Access Control (RBAC)** system using:
- **NGXS** for state management
- **Ng Zorro Ant Design** for UI components
- **JSON Server** as a mock backend
- **Compodoc** for automatic documentation

---

## 📦 Tech Stack

| Tool             | Purpose                    |
|------------------|----------------------------|
| Angular          | Frontend framework         |
| NGXS             | State management           |
| Ng Zorro Antd    | UI components              |
| JSON Server      | Mock API (REST simulation) |
| Compodoc         | Documentation generator    |
| ESLint + Prettier| Code quality & formatting  |
| Husky            | Git hooks (optional)       |

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have installed the following tools:

- [Node.js](https://nodejs.org/) (v20.10)
- npm (comes with Node.js)
- Angular CLI (v19+)

```bash
npm install -g @angular/cli
```

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/angular-rbac.git
cd angular-rbac
```

2. **Install dependencies**

```bash
npm run clean:install
```

3. **Start the mock backend (JSON Server)**

```bash
npm run json-server
```

This will start the mock API server at:  
`http://localhost:3000`

4. **Start the Angular development server**

In a new terminal, run:

```bash
ng serve
```

Or use the npm script:

```bash
npm start
```

Open your browser at:  
`http://localhost:4200`

---

## 🧰 Available Commands

| Command                          | Description                                      |
|---------------------------------|------------------------------------------------|
| `npm run clean`                 | Remove `node_modules`, `dist`, and `coverage`  |
| `npm run clean:dist`            | Remove `dist` folder only                        |
| `npm run clean:install`         | Clean and reinstall dependencies                 |
| `npm run lint`                  | Run ESLint and auto-fix issues                   |
| `npm run format`                | Format codebase with Prettier                     |
| `npm run compodoc:build`        | Generate Compodoc documentation                   |
| `npm run compodoc:serve`        | Serve existing Compodoc docs locally              |
| `npm run compodoc:build-and-serve` | Build and serve docs with Compodoc             |
| `npm run json-server`           | Start JSON Server mock backend on port 3000      |
| `npm start`                    | Alias for `ng serve` to start Angular dev server |

---

## 🔐 Features

- Role-based route guards (`AuthGuard`, `SuperAdminGuard`, `LoggedInGuard`)
- Permission-based UI element rendering
- User and role management with NGXS state management
- Reusable modal forms with validation
- Simulated backend with JSON-server

---

## 🗃️ Mock API (`json-server`)

- Data stored in `db.json`
- Endpoints:

  - `http://localhost:3000/users`
  - `http://localhost:3000/roles`
  - `http://localhost:3000/permissions`

- Supports full CRUD: GET, POST, PUT, DELETE

---

## 🙌 Contributions

Contributions, issues, and feature requests are welcome!  
Feel free to fork and submit pull requests.

---
