import React from 'react';
import { Card } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
  return (
    <Card className={`border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 ${className}`}>
      <div className="flex flex-col gap-5 justify-between p-4">
        {/* Icon Wrapper */}
        {Icon && (
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-neutral-800 text-neutral-100">
            <Icon width={20} height={20} className="w-5 h-5" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {title}
          </span>
          <span className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {value}
          </span>
        </div>
      </div>
    </Card>
  );
};