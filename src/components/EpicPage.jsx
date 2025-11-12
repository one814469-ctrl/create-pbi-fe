import React from "react";
import UserStoryBlock from "./UserStoryBlock";

export default function EpicPage({ epic }) {
  return (
    <section>
      <div className="epic-name">{epic.name}</div>
      <div className="epic-desc">{epic.description}</div>
      {epic.userStories && epic.userStories.length === 0 && (
        <div>No User Stories in this Epic.</div>
      )}
      {epic.userStories &&
        epic.userStories.map(userStory => (
          <UserStoryBlock key={userStory.id} userStory={userStory} />
        ))}
    </section>
  );
}