# Notes App - Web Components

A simple and modern note-taking application built with vanilla JavaScript, focusing on Web Components architecture and interaction with a RESTful API. This project serves as an implementation of fundamental modern front-end development concepts.

_(Tip: Ganti tag di atas dengan screenshot aplikasi Anda setelah Anda mengunggahnya)_

---

## ✨ Features

- **Create, Read, and Delete Notes:** Full basic functionality for note management.
- **Archive/Unarchive System:** Move notes between an active list and an archive.
- **Separate Views:** Easily toggle between viewing active and archived notes.
- **API Integration:** All data is dynamically fetched from and persisted to the [Dicoding Notes API](https://notes-api.dicoding.dev/v2).
- **User Feedback:** Clear loading indicators and error messages provide a better user experience.
- **Smooth Animations:** Notes appear with a subtle and smooth animation, powered by GSAP.

---

## 💻 Technology Stack

- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **Architecture:** **Web Components** (Shadow DOM, Custom Elements, HTML Templates)
- **API Communication:** **Fetch API** (`async/await`)
- **Animation:** **GSAP** (GreenSock Animation Platform)
- **Build Tool:** **Webpack**
- **Development Server:** `webpack-dev-server`
- **Package Manager:** `npm`

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <URL-repository-Anda>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <nama-folder-proyek>
    ```

3.  **Install all the necessary dependencies:**
    ```bash
    npm install
    ```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run start`

This command runs the app in development mode using `webpack-dev-server`.
Open [http://localhost:8081](http://localhost:8081) (or another port if specified) to view it in your browser. The page will automatically reload if you make changes to the code.

### `npm run build`

This command builds the app for production. It bundles all the code and outputs the final, optimized files into the `dist` directory. These are the files you would deploy to a web server.
