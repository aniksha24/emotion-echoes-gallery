
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  emotions: Emotion[];
  userId: string;
}

export interface Emotion {
  id: string;
  name: string;
  color: string;
}

export const emotionOptions: Emotion[] = [
  { id: '1', name: 'Happy', color: '#FFD166' },
  { id: '2', name: 'Sad', color: '#73D2DE' },
  { id: '3', name: 'Excited', color: '#FF9F1C' },
  { id: '4', name: 'Calm', color: '#A0C4FF' },
  { id: '5', name: 'Anxious', color: '#9381FF' },
  { id: '6', name: 'Grateful', color: '#06D6A0' },
  { id: '7', name: 'Loved', color: '#FFADAD' },
  { id: '8', name: 'Nostalgic', color: '#B392AC' }
];
