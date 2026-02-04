import { NewsResponseDto } from "@/app/types";
import NewsCard from "./NewsCard";

export default function NewsList({ newsList }: { newsList: NewsResponseDto[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsList.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}
