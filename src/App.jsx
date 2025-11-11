import React from "react";
import Epic from "./components/Epic";

const projectData = [
  {
    Epic_title: "User Authentication",
    description: "Enable users to securely sign up, sign in, and manage their account.",
    Features: [
      {
        title: "Sign Up Feature",
        description: "Allow new users to create an account with email and password.",
        userStories: [
          {
            title: "Email validation",
            description: "As a user, I want to ensure my email is valid to receive communications.",
            acceptance_criteria: "The system should reject invalid email formats upon sign up."
          },
          {
            title: "Password strength check",
            description: "As a user, I want to be informed about password strength.",
            acceptance_criteria: "Passwords must be 8+ characters including numbers and letters."
          }
        ]
      },
      {
        title: "Sign In Feature",
        description: "Allow existing users to securely sign in using their credentials.",
        userStories: [
          {
            title: "Remember Me",
            description: "As a user, I want to stay signed in on this device.",
            acceptance_criteria: "Checkbox to keep user logged in after browser close."
          },
          {
            title: "Forgot Password",
            description: "As a user, I want to reset my password if I forget it.",
            acceptance_criteria: "System sends password reset link to registered email."
          }
        ]
      }
    ]
  },
  {
    Epic_title: "Dashboard",
    description: "Provide users with an overview of their account and recent activity.",
    Features: [
      {
        title: "Activity Feed",
        description: "Show recent user actions in chronological order.",
        userStories: [
          {
            title: "Real-time updates",
            description: "As a user, I want my feed to update automatically.",
            acceptance_criteria: "New activities appear in feed without page reload."
          }
        ]
      },
      {
        title: "Statistics Widgets",
        description: "Display summary metrics of user performance.",
        userStories: [
          {
            title: "Widget customization",
            description: "As a user, I want to choose which stats to display.",
            acceptance_criteria: "Users can add/remove widgets on their dashboard."
          }
        ]
      }
    ]
  }
];

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Project Epics, Features & User Stories</h1>
      </header>
      <main>
        {projectData.length === 0 ? (
          <p>No project data available.</p>
        ) : (
          projectData.map((epic, index) => <Epic key={index} epic={epic} />)
        )}
      </main>
      <footer>
        <small>© 2024 Project Viewer</small>
      </footer>
    </div>
  );
}