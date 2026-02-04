interface SentimentBadgeProps {
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export default function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const colorMap = {
    POSITIVE: 'bg-green-100 text-green-800 border-green-400',
    NEGATIVE: 'bg-red-100 text-red-800 border-red-400',
    NEUTRAL: 'bg-gray-100 text-gray-800 border-gray-400',
  };

  const sentimentStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium border";

  return (
    <span className={`${sentimentStyle} ${colorMap[sentiment]}`}>
      {sentiment}
    </span>
  );
}
