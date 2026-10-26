# TutorTutee — Tutoring Marketplace

A React-based tutoring marketplace designed to connect learners with tutors through a simple, accessible platform. TutorTutee provides user authentication, tutor discovery, profile management, and a dedicated interface for learners and tutors.

**Frontend:** React  
**Backend:** Spring Boot REST API  
**Status:** Developed and tested locally

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Flow](#application-flow)
- [Getting Started](#getting-started)
- [Backend Integration](#backend-integration)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

TutorTutee aims to make it easier for learners to find tutors and for tutors to present their teaching profiles.

This repository contains the frontend application, built with React, that communicates with the TutorTutee backend through REST APIs.

**Backend repository:** [TutorTutee Backend](https://github.com/Celenkosini/tutor-tuteee)

---

## Screenshots

The following screenshots demonstrate the user interface and key functionality of TutorTutee.

### 1. Landing Page

<!-- Add landing page screenshot here -->

![TutorTutee Landing Page](screenshots/landing-page.png)

*Description: The main entry point to the TutorTutee platform.*

### 2. User Registration

<!-- Add registration screenshot here -->

![Registration Page](screenshots/register.png)

*Description: Registration interface for learners and tutors.*

### 3. User Login

<!-- Add login screenshot here -->

![Login Page](screenshots/login.png)

*Description: Authentication interface for registered users.*

### 4. Tutor Profile Setup

<!-- Add tutor profile setup screenshot here -->

![Tutor Profile Setup](screenshots/tutor-profile-setup.png)

*Description: Interface for tutors to provide their biography, subjects, hourly rate, location, profile image, and availability.*

### 5. Tutor Discovery

<!-- Add tutor listing/search screenshot here -->

![Tutor Discovery](screenshots/tutors.png)

*Description: Interface for learners to discover and explore tutor profiles.*

### 6. Tutor Profile

<!-- Add individual tutor profile screenshot here -->

![Tutor Profile](screenshots/tutor-profile.png)

*Description: Displays a tutor's profile and available information.*

### 7. Dashboard

<!-- Add dashboard screenshot here -->

![User Dashboard](screenshots/dashboard.png)

*Description: The dashboard available to authenticated users.*

---

## Features

- User registration and login
- Tutor and learner account roles
- Authenticated navigation and protected routes
- First-time tutor profile setup
- Tutor profile viewing and discovery
- Frontend integration with REST APIs
- Responsive user interface

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| JavaScript | Application logic |
| React Router | Client-side navigation |
| Axios | HTTP requests to the backend |
| Bootstrap | Styling and responsive layouts |
| CSS | Custom interface styling |

---

## Application Flow

1. A new user registers as a tutor or learner.
2. The user logs in with their email and password.
3. Tutors without an existing profile are directed to complete their profile.
4. Tutors with an existing profile can proceed to the dashboard.
5. Learners can access the available tutor discovery functionality.
6. The frontend communicates with the backend to perform supported operations.

---

## Getting Started

### Prerequisites

- Node.js
- npm
- A running TutorTutee backend

### Installation

Clone the repository:

```bash
git clone https://github.com/Celenkosini/tutor-tutee.git
cd tutor-tutee
```

Install dependencies:

```bash
npm install
```

### Configuration

Configure the frontend API base URL to point to the running backend using the configuration already implemented in the project.

### Run the application

```bash
npm start
```

The development server normally runs at:

`http://localhost:3000`

### Build for production

```bash
npm run build
```

---

## Backend Integration

The frontend integrates with the TutorTutee Spring Boot backend.

**Backend repository:** [github.com/Celenkosini/tutor-tuteee](https://github.com/Celenkosini/tutor-tuteee)

The backend provides the API functionality for authentication, tutor profiles, and other supported application operations.

---

## Project Structure

```text
src/
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Tutor/
│   │   └── Tutors.jsx
│   └── nav/
│       └── NavBar.jsx
├── App.jsx
└── index.js

public/
package.json
README.md
```

*Adjust this structure to match the actual files and folders in your repository.*

---

## Future Improvements

- Enhanced tutor search and filtering
- Improved profile image handling
- Additional user experience improvements
- Further responsive design refinements

---

## Author

**Celenkosini Nyawo**

GitHub: [@Celenkosini](https://github.com/Celenkosini)

---

*TutorTutee — Connecting learners with tutors through technology.*
