import React from 'react';
import TaskComponent from './TaskComponent';

function UserStoryBlock({ userStory }) {
  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{userStory.title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <p>{userStory.description}</p>
        <ul className="mt-2">
          {userStory.tasks.map((task, index) => (
            <li key={index} className="mb-2">
              <TaskComponent task={task} />
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

export default UserStoryBlock;