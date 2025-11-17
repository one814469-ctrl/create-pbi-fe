# Smart Loan Processing System

This project demonstrates a React application built with Vite, showcasing features based on the provided Agile Epics, User Stories, and Tasks for a Smart Loan Processing System.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd smart-loan-processing-system
    
2.  **Install dependencies:**
    ```bash
    npm install
    
3.  **Run the development server:**
    ```bash
    npm run dev
    
    The application will be available at `http://localhost:5173`.

## Project Structure

-   `src/`: Contains all the application's source code.
    -   `App.jsx`: The main application component, handling routing and global layout.
    -   `App.css`: Global styles, including Tailwind CSS imports.
    -   `main.jsx`: The entry point for the React application.
    -   `data/epics.json`: Structured data containing all Epics, User Stories, and Tasks.
    -   `components/`: Reusable React components.
        -   `EpicPage.jsx`: Renders the details and user stories for a specific Epic.
        -   `UserStoryBlock.jsx`: Displays a User Story and its associated Tasks.
        -   `TaskComponent.jsx`: Implements the interactive functionality for each Task based on its description.

## Features Implemented

The application dynamically generates UI elements for each task, simulating various functionalities:

*   **Loan Application Form:** Interactive form with input fields, loan type selection, and submission logic.
*   **Application Status Tracking:** Component to display and cycle through loan application statuses.
*   **Document Upload & OCR Processing:** File upload input with simulated OCR verification.
*   **Credit Bureau Integration:** Button to simulate fetching a credit score from an external API.
*   **Notification System:** UI to simulate sending email/SMS notifications.
*   **Reporting Dashboard:** Displays mock analytics data and a button to simulate report generation.

## Technologies Used

*   **React:** Frontend library for building user interfaces.
*   **Vite:** Fast build tool and development server.
*   **React Router DOM:** For declarative routing.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Axios:** (Included in `package.json` but not explicitly used in mock APIs, good practice to include for real API calls)
*   **Headless UI & Heroicons:** (Included in `package.json` but not explicitly used in current mock UI, good practice for component building)