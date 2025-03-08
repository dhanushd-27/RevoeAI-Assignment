# AppSheet

## Description

AppSheet is an authenticated web application that allows users to input a public Google Sheet link and generates a well-structured table for easy viewing and understanding of data.

## Features

- JWT authentication stored in cookies
- ShadCN UI components for an elegant interface
- MongoDB as the database
- Built with TypeScript for enhanced type safety

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, ShadCN
- **Backend:** Node.js, MongoDB
- **Authentication:** JWT
- **Package Manager:** npm (Frontend), pnpm (Backend)

## System Requirements

- **RAM:** 8GB
- **Processor:** Intel i5 or higher
- **Node.js:** Latest LTS version recommended
- **MongoDB:** Installed and running locally or via cloud service

## Installation & Setup

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm i
   ```
3. Configure environment variables based on `.env.sample`:
   ```sh
   NEXT_PUBLIC_API_URI=
   NEXT_PUBLIC_JWT_SECRET=
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   pnpm i
   ```
3. Configure environment variables:
   ```sh
   PORT=
   MONGODB_URI=
   MONGODB_NAME=
   ```
4. Start the server:
   ```sh
   pnpm run dev
   ```

## Deployment

Currently, the project has not been deployed due to time constraints.

## Inspirations

The dashboard UI design was inspired by **ShadCN Blocks**.

## Contributors

- Dhanush D

---

Feel free to update this README as necessary! 🚀

