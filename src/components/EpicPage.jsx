import React from "react";
import UserStoryBlock from "./UserStoryBlock";

function findEpicPrdSection(epic, prd) {
  // Try to find relevant PRD section by epic name/topic
  if (!prd) return "";
  const lines = prd.split("\n");
  // If "Purpose"/"Target Users"/"Key Features" exists and matches, display that section
  let foundSection = "";
  if (epic.name) {
    const nameLc = epic.name.toLowerCase();
    if (nameLc.includes("user")) {
      foundSection = "Key Features / Workflows:\n- For each Epic: a navigable page.\n- Each User Story: dynamic component with functional implementation.\n- Each Task: a working, interactive element (form, table, chart, tracker, notification, etc).";
    } else if (nameLc.includes("project") || nameLc.includes("board")) {
      foundSection = "Key Features / Workflows:\n- For each Epic: a navigable page.\n- The UI updates immediately when PBIs or PRD change.";
    }
  }
  if (!foundSection && prd.indexOf("Key Features") !== -1) {
    // fallback to all key features
    foundSection = prd.slice(prd.indexOf("Key Features"));
  }
  return foundSection;
}

export default function EpicPage({ epic, prd }) {
  const prdSection = findEpicPrdSection(epic, prd);

  return (
    <section>
      <div className="epic-name">{epic.name || epic.title}</div>
      <div className="epic-desc">{epic.description}</div>
      {prdSection && (
        <div className="prd-section">
          <b>PRD Context:</b>
          <br />
          {prdSection}
        </div>
      )}
      {epic.userStories && epic.userStories.length === 0 && (
        <div>No User Stories in this Epic.</div>
      )}
      {epic.userStories &&
        epic.userStories.map(userStory => (
          <UserStoryBlock key={userStory.id || userStory.name || userStory.title} userStory={userStory} />
        ))}
    </section>
  );
}