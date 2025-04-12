
import React from 'react';

const EmotionTag = ({ emotion }) => {
  return (
    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-flex items-center text-sm">
      {emotion.name}
    </span>
  );
};

export default EmotionTag;
