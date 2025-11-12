import React from "react";
import DynamicTaskFeature from "./DynamicTaskFeature";

export default function DynamicUserStoryFeature({ userStory }) {
  if (!userStory.tasks || userStory.tasks.length === 0) {
    return (
      <div className="success-msg" style={{ marginTop: 4 }}>
        No Tasks in this Story.
      </div>
    );
  }

  // Tasks may be combined in some UIs (form+submit, list+remove, etc).
  // Each DynamicTaskFeature will decide whether to render individually or combine.
  return (
    <div>
      {userStory.tasks.map(task => (
        <div key={task.id || task.name || task.title} style={{ marginBottom: 8 }}>
          <DynamicTaskFeature task={task} allTasks={userStory.tasks} />
        </div>
      ))}
    </div>
  );
}