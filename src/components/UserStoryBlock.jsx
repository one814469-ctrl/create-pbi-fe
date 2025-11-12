import React from "react";
import DynamicUserStoryFeature from "./dynamic/DynamicUserStoryFeature";

export default function UserStoryBlock({ userStory }) {
  return (
    <div className="user-story-block">
      <div className="user-story-name">{userStory.name || userStory.title}</div>
      <div className="user-story-desc">{userStory.description}</div>
      <div className="task-section">
        <DynamicUserStoryFeature userStory={userStory} />
      </div>
    </div>
  );
}