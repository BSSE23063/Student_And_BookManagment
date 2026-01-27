# Student & Books Management System

A modern, responsive web application for managing students and their assigned books. Built with Node.js, Express, MongoDB, and Bootstrap 5, featuring a sleek Glassmorphism UI.

### [Live Demo: Click Here to View App](https://student-and-book-managment.vercel.app)

---

## Project Overview

This application streamlines the process of tracking students and library books. It allows administrators to register students, manage the book inventory, and handle real-time book assignments. The interface is built with a mobile-first approach, ensuring usability across all devices.

---

## Features

### Student Management
* **Registration:** Add new students with name, email, and roll number.
* **Directory:** View all students in an interactive, searchable table.
* **Search:** Filter students by name, email, or roll number instantly.
* **Visuals:** Auto-generated avatars with student initials.
* **Stats:** View individual book assignment counts per student.

### Book Management
* **Inventory:** Add new books with title, author, year, and description.
* **Collection:** Browse the full library of available books.
* **Assignments:** One-click book assignment to students.
* **History:** Track which books are currently assigned vs. available.

### Modern UI/UX
* **Glassmorphism:** Trendy semi-transparent cards with backdrop blur.
* **Responsive:** Fully adaptive layout (Mobile, Tablet, Desktop).
* **Animations:** Smooth transitions using Animate.css.
* **Feedback:** Real-time toast notifications and interactive modals.

---

## Technology Stack

### Frontend
* **HTML5, CSS3, JavaScript (ES6+)**
* **Bootstrap 5.3.0** (Responsive Layout)
* **Font Awesome 6.4.0** (Icons)
* **Animate.css** (Animations)
* **Custom CSS** (Glassmorphism Effects)

### Backend
* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose ODM**
* **EJS** (Templating Engine)
* **RESTful API** Architecture

### Deployment
* **Vercel** (Hosting)
* **MongoDB Atlas** (Cloud Database)

---

## Project Structure

```text
students-books-management/
├── controllers/          # Business logic
│   ├── bookController.js
│   └── recordController.js
├── models/               # Database Schemas
│   ├── Book.js
│   └── Record.js
├── routes/               # API Endpoints
│   ├── bookRoutes.js
│   └── recordRoutes.js
├── views/                # EJS Templates
│   ├── index.ejs
│   ├── addBook.ejs
│   ├── addRecord.ejs
│   ├── viewRecords.ejs
│   └── viewOrders.ejs
├── public/               # Static Assets
│   ├── css/
│   ├── js/
│   └── images/
├── .env                  # Environment Variables
├── app.js                # Entry Point
└── package.json
Installation & SetupPrerequisites: Node.js (v14+) & MongoDB.Clone the repositoryBashgit clone [https://github.com/yourusername/students-books-management.git](https://github.com/yourusername/students-books-management.git)
cd students-books-management
Install dependenciesBashnpm install
Environment ConfigurationCreate a .env file in the root directory:Code snippetPORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
Start the serverBash# Production mode
npm start

# Development mode (with nodemon)
npm run dev
Access the appOpen http://localhost:3000 in your browser.API EndpointsStudent RoutesMethodEndpointDescriptionGET/record/viewView all studentsGET/recordGet Add Student formPOST/recordCreate new studentPOST/record/purchaseAssign book to studentGET/record/orderView all assignmentsBook RoutesMethodEndpointDescriptionGET/bookGet Add Book formPOST/bookCreate new bookGET/infoSearch booksDeployment on VercelPush to GitHub:Bashgit add .
git commit -m "Ready for deployment"
git push origin main
Import to Vercel: Go to Vercel dashboard and import your repo.Environment Variables: Add your MONGODB_URI in Vercel settings.MongoDB Atlas: Whitelist 0.0.0.0/0 (or Vercel IPs) in Network Access.Future Enhancements[ ] User authentication (Login/Signup)[ ] Book return functionality & due dates[ ] Email notifications for overdue books[ ] Export data to CSV/PDF[ ] Dark Mode toggleContributingContributions are welcome!Fork the repository.Create a feature branch (git checkout -b feature/AmazingFeature).Commit your changes (git commit -m 'Add some AmazingFeature').Push to the branch (git push origin feature/AmazingFeature).Open a Pull Request.LicenseThis project is licensed under the MIT License.SupportFor support, please email umairsafdar722@gmail.com or create a GitHub Issue.Show your support! Give a star if this project helped you!
