import React from 'react';
import DynamicTaskFeature from './DynamicTaskFeature.jsx';

function DynamicUserStoryFeature({ task, epicSlug, userStoryId }) {
  // Delegates to dynamic task component
  return (
    <div className="dynamic-story-feature">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <DynamicTaskFeature
        task={task}
        epicSlug={epicSlug}
        userStoryId={userStoryId}
      />
      {task.acceptanceCriteria && (
        <ul className="acceptance-criteria">
          {task.acceptanceCriteria.map((criteria, idx) => (
            <li key={idx}>{criteria}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DynamicUserStoryFeature;

---