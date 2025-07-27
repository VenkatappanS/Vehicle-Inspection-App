# Vehicle Inspection App

## Key Features
Multi-Step Form Interface: Guides inspectors through a structured, intuitive process for comprehensive data collection.

Microphone-Based Inputs: Enables hands-free data entry, improving speed and convenience during inspections.

MongoDB Integration: Securely stores all inspection data, providing a scalable and flexible database solution.

AI-Based Report Summarization (using Gemini API): Automatically generates concise and intelligent summaries of inspection reports, highlighting key findings.

PDF Report Generation: Allows users to easily download and share professional, standardized inspection reports.

---

## Technologies Used
The application is built as a full-stack MERN (MongoDB, Express.js, React, Node.js) application:

MongoDB: NoSQL database for flexible data storage.

Express.js: Web application framework for Node.js, forming the backend API.

React: JavaScript library for building interactive user interfaces.

Node.js: JavaScript runtime environment for server-side logic.

Gemini API: For AI-powered report summarization.

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

git clone https://github.com/VenkatappanS/Vehicle-Inspection-App.git
cd Vehicle-Inspection-App

### 2. Setup Frontend

cd client
npm install
npm run dev

### 3. Setup Backend

cd ../server
npm install
node server.js

---

### Future Work
Role-Based Access Control: Implement distinct roles for inspectors and administrators with varying permissions.

Task Assignment: Develop an admin dashboard to assign inspection tasks to specific inspectors.

Email Notifications: Integrate functionality to send email notifications with attached reports.

Application Hosting: Deploy the application on cloud platforms such as Vercel or Render for broader accessibility.
