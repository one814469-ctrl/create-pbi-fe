import React from 'react';
import DynamicUserStoryFeature from './dynamic/DynamicUserStoryFeature.jsx';

function UserStoryBlock({ userStory, epicSlug }) {
  return (
    <section className="user-story-block">
      <h3>{userStory.title}</h3>
      <p>{userStory.description}</p>
      <div className="tasks-list">
        {userStory.tasks.map(task => (
          <DynamicUserStoryFeature
            key={task.id}
            task={task}
            epicSlug={epicSlug}
            userStoryId={userStory.id}
          />
        ))}
      </div>
    </section>
  );
}

export default UserStoryBlock;

---