import React from "react";
import DynamicTaskFeature from "./DynamicTaskFeature";

/*
 * This component receives a userStory and renders all its tasks
 * as dynamic components with implemented functionality.
 */
export default function DynamicUserStoryFeature({ userStory }) {
  if (!userStory.tasks || userStory.tasks.length === 0) return (
    <div className="success-msg" style={{marginTop: 4}}>No Tasks in this Story.</div>
  );

  // If only 1 task, render the DynamicTaskFeature directly.
  if (userStory.tasks.length === 1)
    return <DynamicTaskFeature task={userStory.tasks[0]} allTasks={userStory.tasks} />;

  // For multiple tasks, show all implementations (some may be combined by design)
  return (
    <div>
      {userStory.tasks.map(task => (
        <div key={task.id} style={{marginBottom: 8}}>
          <DynamicTaskFeature task={task} allTasks={userStory.tasks} />
        </div>
      ))}
    </div>
  );
}