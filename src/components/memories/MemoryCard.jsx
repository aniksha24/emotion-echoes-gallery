
import React from 'react';
import EmotionTag from './EmotionTag';

const MemoryCard = ({ memory }) => {
  const formattedDate = new Date(memory.createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden memory-card">
      {memory.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{memory.title}</h3>
          <div className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2 line-clamp-3">{memory.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {memory.emotions.map((emotion) => (
            <EmotionTag key={emotion.id} emotion={emotion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
