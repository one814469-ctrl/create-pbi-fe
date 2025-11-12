import React from "react";
import DynamicTaskFeature from "./DynamicTaskFeature";

/*
 * This component receives a userStory and renders all its tasks
 * as dynamic components with implemented functionality.
 */
export default function DynamicUserStoryFeature({ userStory }) {
  if (!userStory.tasks || userStory.tasks.length === 0)
    return (
      <div className="success-msg" style={{ marginTop: 4 }}>
        No Tasks in this Story.
      </div>
    );

  // For multiple tasks, some may be combined by design depending on their type.
  // We pass all tasks to children so they can combine as needed (e.g. form+submit, list+remove).
  return (
    <div>
      {userStory.tasks.map(task => (
        <div key={task.id} style={{ marginBottom: 8 }}>
          <DynamicTaskFeature task={task} allTasks={userStory.tasks} />
        </div>
      ))}
    </div>
  );
}