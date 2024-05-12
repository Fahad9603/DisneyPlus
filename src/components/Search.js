import React, { useState } from "react";

const ExpandableTextbox = () => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("");

  const handleIconClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-full"
          onClick={handleIconClick}
        >
          {expanded ? "-" : "+"}
        </button>
        {expanded && (
          <input
            type="text"
            className="border border-gray-300 ml-2 px-2 py-1 rounded"
            value={text}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default ExpandableTextbox;
