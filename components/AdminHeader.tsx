'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-800 md:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1">
          {/* Search placeholder */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications dropdown */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-800"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
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
                  {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-white"
                  aria-hidden="true"
                >
                  {session?.user?.name}
                </span>
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/admin/settings"
                      className={classNames(
                        active ? 'bg-gray-700' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-300'
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
                        'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-300'
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
