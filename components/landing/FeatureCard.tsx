import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  diagram: ReactNode;
  href: string;
  rotation: string;
  bgColor: string;
}

export function FeatureCard({
  icon,
  number,
  title,
  subtitle,
  description,
  diagram,
  href,
  rotation,
  bgColor,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={`block ${rotation} transition-all duration-200 hover:rotate-0 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div
        className={`${bgColor} rounded-lg p-6 shadow-lg border-2 border-gray-800 border-opacity-10 h-full min-h-[420px]`}
      >
        {/* Header */}
        <div className="mb-4 border-b-2 border-gray-800 border-opacity-20 pb-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{icon}</span>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                {number}. {title}
              </h3>
              <code className="text-sm text-blue-700 font-mono bg-white bg-opacity-50 px-2 py-0.5 rounded">
                {subtitle}
              </code>
            </div>
          </div>
        </div>

        {/* Diagram */}
        <div className="mb-4 bg-white bg-opacity-40 rounded-lg">
          {diagram}
        </div>

        {/* Description */}
        <p className="text-[15px] leading-[22px] text-gray-800 mb-4">
          {description}
        </p>

        {/* Try it button */}
        <div className="mt-auto pt-4 border-t-2 border-gray-800 border-opacity-20">
          <span className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:text-blue-900">
            Try it →
          </span>
        </div>
      </div>
    </Link>
  );
}
