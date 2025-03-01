'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { 
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BellIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCardIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Blog', href: '/admin/blog', icon: PencilSquareIcon },
  { name: 'Documents', href: '/admin/documents', icon: DocumentTextIcon },
  { name: 'Roles', href: '/admin/roles', icon: ShieldCheckIcon },
  { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component for mobile */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link href="/admin" className="flex items-center">
                      <span className="text-2xl font-bold text-primary">Admin</span>
                      <span className="ml-2 text-sm text-gray-400">Dashboard</span>
                    </Link>
                  </div>
                  {/* Admin profile section */}
                  <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-white">
                    {session?.user?.image ? (
                      <Image
                        className="h-8 w-8 rounded-full bg-gray-800"
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
                    <div className="flex flex-col">
                      <span className="sr-only">Admin profile</span>
                      <span aria-hidden="true">{session?.user?.name}</span>
                      <span className="text-xs text-gray-400" aria-hidden="true">
                        Administrator
                      </span>
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                    isActive
                                      ? 'bg-gray-800 text-primary'
                                      : 'text-gray-400 hover:bg-gray-800 hover:text-primary'
                                  }`}
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  <item.icon
                                    className={`h-6 w-6 shrink-0 ${
                                      isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                                    }`}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex md:w-72 md:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/admin" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Admin</span>
              <span className="ml-2 text-sm text-gray-400">Dashboard</span>
            </Link>
          </div>
          {/* Admin profile section */}
          <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-white">
            {session?.user?.image ? (
              <Image
                className="h-8 w-8 rounded-full bg-gray-800"
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
            <div className="flex flex-col">
              <span className="sr-only">Admin profile</span>
              <span aria-hidden="true">{session?.user?.name}</span>
              <span className="text-xs text-gray-400" aria-hidden="true">
                Administrator
              </span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                            isActive
                              ? 'bg-gray-800 text-primary'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-primary'
                          }`}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                            }`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
