'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DashboardHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow">
      <button
        type="button"
        className="border-r border-gray-800 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          {/* Add search or other header content here */}
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                {session?.user?.image ? (
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/profile"
                      className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block px-4 py-2 text-sm text-gray-300'
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/settings"
                      className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block px-4 py-2 text-sm text-gray-300'
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block w-full text-left px-4 py-2 text-sm text-gray-300'
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
