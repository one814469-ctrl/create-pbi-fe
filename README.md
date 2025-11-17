# Smart Loan Processing System

This project is a dynamically generated React application built with Vite, showcasing features for a Smart Loan Processing System based on structured Agile PBIs (Epics, User Stories, and Tasks) and a Product Requirements Document (PRD).

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

*   **Loan Application Form:** Interactive form with input fields, loan type selection, and submission logic with validation.
*   **Application Status Tracking:** Component to display and cycle through mock loan application statuses.
*   **Document Upload & OCR Processing:** File upload input with preview and simulated OCR verification, including success/failure states.
*   **Credit Bureau Integration:** Button to simulate fetching a credit score from an external API, showing loading states and error handling.
*   **Notification System:** UI to simulate sending email/SMS notifications with recipient and message inputs.
*   **Reporting Dashboard:** Displays mock analytics data (KPIs) and a button to simulate report generation (e.g., PDF/CSV download).

## Technologies Used

*   **React:** Frontend library for building user interfaces.
*   **Vite:** Fast build tool and development server.
*   **React Router DOM:** For declarative routing.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **Axios:** (Included in `package.json` for potential future API calls, though mock APIs are simulated with `setTimeout` for this project).