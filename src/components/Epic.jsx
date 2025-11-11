import React from "react";
import Feature from "./Feature";

export default function Epic({ epic }) {
  const { Epic_title, description, Features } = epic;

  return (
    <section className="epic">
      <h2 className="epic-title">{Epic_title}</h2>
      <p className="epic-description">{description}</p>
      <div className="features">
        {Features && Features.length > 0 ? (
          Features.map((feature, index) => <Feature key={index} feature={feature} />)
        ) : (
          <p className="no-features">No features available.</p>
        )}
      </div>
    </section>
  );
}