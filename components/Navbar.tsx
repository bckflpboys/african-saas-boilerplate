'use client';

import { Fragment, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center">
            <span className="text-2xl font-bold text-primary">AfriSaaS</span>
          </Link>

          {/* Center Navigation Items */}
          <div className="hidden sm:flex sm:space-x-8 flex-1 justify-center">
            <Link
              href="/features"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-primary"
            >
              Documentation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    {session.user?.image ? (
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={session.user.image}
                        alt=""
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
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
                    {/* User Info Section */}
                    <div className="px-4 py-3">
                      <p className="text-sm text-white">{session.user?.name}</p>
                      <p className="text-sm font-medium text-gray-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    {/* Divider */}
                    <div className="border-t border-gray-700"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/dashboard"
                          className={classNames(
                            active ? 'bg-gray-700' : '',
                            'block px-4 py-2 text-sm text-gray-300'
                          )}
                        >
                          Dashboard
                        </Link>
                      )}
                    </Menu.Item>
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
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/signin"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/features"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
            >
              Documentation
            </Link>
          </div>
          {session ? (
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                {session.user?.image ? (
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={session.user.image}
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{session.user?.name}</div>
                  <div className="text-sm font-medium text-gray-400">{session.user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
                >
                  Your Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
                >
                  Settings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-700 pb-3 pt-4 px-4 space-y-2">
              <Link
                href="/auth/signin"
                className="block w-full text-center rounded-md bg-primary px-3 py-2 text-base font-medium text-white hover:bg-primary/90"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full text-center rounded-md bg-white/10 px-3 py-2 text-base font-medium text-white hover:bg-white/20"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </Transition>
    </nav>
  );
}
