import React, { useState } from "react";

const LongText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const maxLength = 350; // Adjust the max length for the first paragraph

  return (
    <div className="p-4">
      <p className="mb-1">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button onClick={toggleText} className="subtitle my-1 hover:text-tint hover:underline">
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
};

export default LongText;
