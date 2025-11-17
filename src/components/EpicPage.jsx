import React from 'react';
import UserStoryBlock from './UserStoryBlock.jsx';

function EpicPage({ epic }) {
  if (!epic) return <div>Loading Epic...</div>;

  return (
    <div className="epic-page">
      <h2>{epic.title}</h2>
      <p>{epic.description}</p>
      <div className="user-stories-list">
        {epic.userStories.map(story => (
          <UserStoryBlock
            key={story.id}
            userStory={story}
            epicSlug={epic.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default EpicPage;

---