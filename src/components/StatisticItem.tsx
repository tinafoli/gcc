'use client';

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatisticItemProps {
  end: number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export default function StatisticItem({ end, label, icon, description, className }: StatisticItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Calculate duration based on number size
  const calculateDuration = (num: number) => {
    if (num <= 500) return 1;
    if (num <= 20000) return 2;
    return 2.5;
  };

  return (
    <div ref={ref} className={`${className || ''}`}>
      {icon && (
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 text-green-600">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-4xl font-bold text-gray-900 mb-2">
        {inView ? (
          <CountUp
            end={end}
            duration={calculateDuration(end)}
            separator=","
            suffix="+"
          />
        ) : "0+"}
      </h3>
      <p className="text-gray-600">{label}</p>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
    </div>
  );
} 