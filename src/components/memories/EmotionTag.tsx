
import { Emotion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EmotionTagProps {
  emotion: Emotion;
  onClick?: () => void;
  selected?: boolean;
  selectable?: boolean;
}

const EmotionTag = ({ 
  emotion, 
  onClick, 
  selected = false,
  selectable = false 
}: EmotionTagProps) => {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-sm font-medium emotion-tag",
        selectable && "cursor-pointer",
        selected && "ring-2 ring-offset-1"
      )}
      style={{ 
        backgroundColor: `${emotion.color}22`,
        color: emotion.color,
        borderColor: emotion.color,
        borderWidth: "1px"
      }}
      onClick={onClick}
    >
      {emotion.name}
    </span>
  );
};

export default EmotionTag;
