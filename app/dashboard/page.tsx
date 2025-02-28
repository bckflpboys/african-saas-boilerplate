'use client';

import { useSession } from 'next-auth/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive',
  },
  {
    name: 'Active Users',
    value: '2,338',
    change: '+15.3%',
    changeType: 'positive',
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-4.5%',
    changeType: 'negative',
  },
  {
    name: 'Avg. Session Duration',
    value: '2m 56s',
    change: '+12.3%',
    changeType: 'positive',
  },
];

const recentActivity = [
  {
    id: 1,
    event: 'Payment processed',
    description: 'Monthly subscription payment processed successfully',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    event: 'New login detected',
    description: 'New login from Chrome on Windows',
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    event: 'Profile updated',
    description: 'User profile information was updated',
    timestamp: '1 day ago',
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Welcome back, {session?.user?.name}
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Here's what's happening with your account today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-gray-800 px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-400">
                {stat.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-white">
                  {stat.value}
                </div>

                <div
                  className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 ${
                    stat.changeType === 'positive'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {stat.change}
                </div>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
          <div className="mt-4 overflow-hidden rounded-lg bg-gray-800 shadow">
            <ul role="list" className="divide-y divide-gray-700">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {activity.event}
                      </p>
                      <p className="text-sm text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                      <p className="text-sm text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
