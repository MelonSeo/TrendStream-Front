interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const getScoreStyle = (score: number) => {
    if (score >= 80) {
      return 'bg-red-100 text-red-800 border-red-400';
    } else if (score >= 60) {
      return 'bg-orange-100 text-orange-800 border-orange-400';
    } else if (score >= 40) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-400';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  const scoreStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium border";

  return (
    <span className={`${scoreStyle} ${getScoreStyle(score)}`}>
      Score: {score}
    </span>
  );
}
