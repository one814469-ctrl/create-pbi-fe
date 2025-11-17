import React from 'react';
import UserStoryBlock from './UserStoryBlock';

function EpicPage({ epic }) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{epic.title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{epic.description}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {epic.userStories.map((story, index) => (
            <UserStoryBlock key={index} userStory={story} />
          ))}
        </dl>
      </div>
    </div>
  );
}

export default EpicPage;