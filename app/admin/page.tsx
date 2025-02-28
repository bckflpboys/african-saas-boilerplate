'use client';

import { 
  UsersIcon, 
  CreditCardIcon, 
  ChartBarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Users', value: '2,100', icon: UsersIcon },
  { name: 'Active Subscriptions', value: '850', icon: CreditCardIcon },
  { name: 'Monthly Revenue', value: '$45,000', icon: ChartBarIcon },
  { name: 'Documents Created', value: '1,200', icon: DocumentTextIcon },
];

const activity = [
  {
    id: 1,
    type: 'signup',
    person: { name: 'John Doe', email: 'john@example.com' },
    date: '2 hours ago',
  },
  {
    id: 2,
    type: 'subscription',
    person: { name: 'Alice Smith', email: 'alice@example.com' },
    date: '4 hours ago',
  },
  {
    id: 3,
    type: 'document',
    person: { name: 'Bob Johnson', email: 'bob@example.com' },
    date: '6 hours ago',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Welcome section */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome to Admin Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Monitor and manage your application's performance and users.
          </p>
        </div>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-gray-900 px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary/10 p-3">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-400">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Recent activity */}
      <div className="mt-8">
        <div className="mx-auto">
          <h2 className="text-base font-semibold leading-6 text-white">
            Recent Activity
          </h2>
          <ul role="list" className="mt-6 space-y-4">
            {activity.map((item) => (
              <li
                key={item.id}
                className="relative flex gap-x-4 rounded-lg bg-gray-900 px-4 py-3"
              >
                <div className="flex-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {item.person.name}
                    </h3>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    {item.person.email} - {item.type}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
