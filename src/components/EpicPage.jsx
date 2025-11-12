import React from "react";
import UserStoryBlock from "./UserStoryBlock";

function extractEpicPrd(epic, prd) {
  // Heuristic: match Epic name with PRD sections (Scope, Deliverables, etc)
  if (!prd) return "";
  const nameLc = (epic.name || epic.title || "").toLowerCase();
  if (nameLc.includes("application portal")) {
    return "PRD: 'Loan Application Portal (Customer-facing)' -- see Project Scope and Deliverables.";
  }
  if (nameLc.includes("document verification")) {
    return "PRD: 'Automated Document Verification Service' -- see Scope and Deliverables.";
  }
  if (nameLc.includes("credit bureau")) {
    return "PRD: 'Credit Check Integration Module' -- see Scope and Deliverables.";
  }
  if (nameLc.includes("notification")) {
    return "PRD: 'Notification & Reporting System' -- see Scope and Deliverables.";
  }
  if (nameLc.includes("analytics")) {
    return "PRD: 'Basic Reporting and Analytics dashboard' -- see Scope and Deliverables.";
  }
  return "";
}

export default function EpicPage({ epic, prd }) {
  const prdSection = extractEpicPrd(epic, prd);

  return (
    <section>
      <div className="epic-name">{epic.name || epic.title}</div>
      <div className="epic-desc">{epic.description}</div>
      {prdSection && (
        <div className="prd-section"><b>{prdSection}</b></div>
      )}
      {epic.userStories &&
        epic.userStories.map(userStory => (
          <UserStoryBlock
            key={userStory.id || userStory.name || userStory.title}
            userStory={userStory}
          />
        ))}
    </section>
  );
}