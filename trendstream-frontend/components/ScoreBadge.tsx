interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const getConfig = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'bg-gradient-to-r from-red-500 to-orange-500',
        text: 'text-white',
        label: 'HOT',
        isHot: true,
      };
    } else if (score >= 60) {
      return {
        bg: 'bg-gradient-to-r from-orange-400 to-amber-400',
        text: 'text-white',
        label: null,
        isHot: false,
      };
    } else if (score >= 40) {
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        label: null,
        isHot: false,
      };
    } else {
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        label: null,
        isHot: false,
      };
    }
  };

  const { bg, text, label, isHot } = getConfig(score);

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${bg} ${text} ${isHot ? 'badge-hot shadow-lg shadow-red-500/30' : ''}`}>
      {label && (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
        </svg>
      )}
      {label || score}
    </span>
  );
}
