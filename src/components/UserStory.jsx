import React from "react";

export default function UserStory({ story }) {
  const { title, description, acceptance_criteria } = story;
  return (
    <div className="user-story">
      <h4 className="user-story-title">{title}</h4>
      <p className="user-story-description"><em>{description}</em></p>
      <p className="acceptance-criteria">
        <strong>Acceptance Criteria: </strong>{acceptance_criteria}
      </p>
    </div>
  );
}