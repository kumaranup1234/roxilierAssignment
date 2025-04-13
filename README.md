# 🌟 Roxilier Store Rating Platform

A full-stack role-based store rating system built for an intern coding challenge. It includes admin, store owner, and user functionalities with rating, management, and dashboards.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + ShadCN UI
- **Backend**: Node.js, Express.js
- **Database**: PostgresSQL (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)

---

## 🔧 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kumaranup1234/roxilierAssignment.git
cd roxilierAssignment


DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database_name>
JWT_SECRET=your_super_secret_key


cd backend
npm install


cd ../frontend
npm install

node index.js
npm run dev