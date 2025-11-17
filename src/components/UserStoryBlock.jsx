import React from 'react';
import TaskComponent from './TaskComponent';

function UserStoryBlock({ userStory }) {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-lg font-medium text-gray-700 sm:col-span-1">{userStory.title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <p className="mb-4">{userStory.description}</p>
        <div className="space-y-6">
          {userStory.tasks.map((task, index) => (
            <TaskComponent key={index} task={task} />
          ))}
        </div>
      </dd>
    </div>
  );
}

export default UserStoryBlock;