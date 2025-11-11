import React from "react";
import UserStory from "./UserStory";

export default function Feature({ feature }) {
  const { title, description, userStories } = feature;
  return (
    <article className="feature">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      <div className="user-stories">
        {userStories && userStories.length > 0 ? (
          userStories.map((story, index) => <UserStory key={index} story={story} />)
        ) : (
          <p className="no-user-stories">No user stories available.</p>
        )}
      </div>
    </article>
  );
}