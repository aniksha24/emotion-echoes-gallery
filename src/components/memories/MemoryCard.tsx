
import { Memory } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import EmotionTag from "./EmotionTag";
import { CalendarDays } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard = ({ memory }: MemoryCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(memory.date), { addSuffix: true });

  return (
    <Card className="w-full memory-card overflow-hidden">
      {memory.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{memory.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{memory.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {memory.emotions.map((emotion) => (
          <EmotionTag key={emotion.id} emotion={emotion} />
        ))}
      </CardFooter>
    </Card>
  );
};

export default MemoryCard;
