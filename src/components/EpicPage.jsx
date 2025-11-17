import React from 'react';
import UserStoryBlock from './UserStoryBlock';

function EpicPage({ epic }) {
  if (!epic) {
    return <div className="text-center text-gray-700 py-10">Epic not found. Please select an Epic from the navigation.</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold leading-6 text-gray-900">{epic.title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{epic.description}</p>
      </div>
      <div className="divide-y divide-gray-200">
        {epic.userStories.map((story, index) => (
          <UserStoryBlock key={index} userStory={story} />
        ))}
      </div>
    </div>
  );
}

export default EpicPage;