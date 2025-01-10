# ob-kavici Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) 
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) 
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern frontend application built with **React** and **Vite** for a games and puzzles platform. The platform provides engaging puzzles and games tailored to Slovenian users.

---

## Features
- Interactive and user-friendly UI for games and puzzles.
- High performance using Vite for development and build.
- Localized for Slovenian users.
- Modern frontend architecture with reusable React components.

---

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Additional Commands](#additional-commands)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

Follow these instructions to set up and run the `frontend` application locally.

### Prerequisites
- **Node.js**: Version 16.14.0 or higher.
- **pnpm**: A fast, disk-efficient package manager. Install it using:
  ```bash
  npm install -g pnpm
  ```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ob-kavici/frontend
   cd frontend/ob-kavici
   ```

2. **Install dependencies using `pnpm`**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Copy and rename the `.env.template` file to `.env`:
   ```bash
   cp .env.template .env
   ```
   Edit the `.env` file to include your environment variables (e.g., API keys, configurations, etc.).

### Running Locally

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open the application in your browser:
   ```
   http://127.0.0.1:5173
   ```

---

## Additional Commands

- **Build for production**:
  ```bash
  pnpm build
  ```

- **Run a preview of the production build**:
  ```bash
  pnpm preview
  ```

- **Lint the codebase**:
  ```bash
  pnpm lint
  ```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to reach out if you encounter any issues or have suggestions for improvement!
