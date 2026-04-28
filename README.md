# 🚀 Breaking Job (Frontend)

Breaking Job is an advanced, AI-powered recruitment platform designed to seamlessly connect top-tier candidates with forward-thinking recruiters. This repository hosts the modern, highly responsive frontend built with React, Vite, and Tailwind CSS. 

For the **Java Microservices Backend**, please visit our main backend repository: [BreakingJob Backend](https://github.com/yashpriyadarshan/BreakingJob).

---

## ✨ Key Features

### 👨‍💼 For Candidates
- **Edda AI Interviewer**: Experience real-time, interactive voice interviews powered by AI. Integrated via LiveKit, Edda conducts interviews, analyzes your performance, and provides actionable feedback.
- **Job & Company Discovery**: Browse active job openings and discover top companies looking for talent.
- **Comprehensive Profiles**: Build a standout profile by uploading your resume, detailing your skills, and showcasing your projects.
- **Community Forum**: Connect with other candidates, share experiences, and grow your network.

### 🏢 For Recruiters
- **Dashboard & Analytics**: Monitor active job postings, application statistics, and candidate pipelines from a centralized dashboard.
- **AI Interview Insights**: Access deep analytics from candidate AI interviews, complete with Azure Blob Storage-backed transcripts, automated scoring, and detailed evaluation reports.
- **Seamless Job Management**: Create and manage job openings effortlessly.
- **Candidate Tracking**: Review candidate profiles, resumes, and interview outcomes in one place.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Real-time Communication**: [LiveKit](https://livekit.io/) (Used for the Edda AI voice interviewer)
- **Tooling**: ESLint, PostCSS

---

## 🚦 Getting Started

Follow these steps to run the Breaking Job frontend locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yashpriyadarshan/Breaking-Job-frontend.git
   cd Breaking-Job-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

*Note: The frontend relies on API proxies defined in `vite.config.js` to communicate with the backend microservices. Ensure the backend services are running locally, or update the proxy targets if connecting to a remote staging environment.*

---

## 🤝 Contributing

We welcome contributions from the community! Whether you want to fix a bug, enhance the UI, or build a new feature, your help is highly appreciated. This is an open-source initiative aimed at revolutionizing the hiring process.

### How to Contribute:
1. **Star and Fork** the repository and clone it locally.
2. **Create a new branch** for your feature or bug fix: 
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes** with descriptive commit messages.
4. **Push** your branch to your fork: 
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** against the main branch of this repository.

### Development Guidelines:
- Ensure your UI changes are fully responsive and follow the existing Tailwind CSS design system.
- Write clean, reusable, and well-documented React code.
- If your feature requires backend changes, please coordinate your PR with the [Backend Repository](https://github.com/yashpriyadarshan/BreakingJob).

---

## 📞 Support & Contact

If you have any questions or run into issues, please open an issue in this repository. Let's build the future of AI recruitment together!
