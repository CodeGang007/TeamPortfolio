import React from 'react';

interface TechBadgeProps {
  label: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ label }) => {
  return (
    <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-teal-50 group-hover:text-teal-700">
      {label}
    </span>
  );
};