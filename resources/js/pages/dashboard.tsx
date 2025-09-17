import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Lists</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your task lists</p>
                        <Link 
                            href="/lists"
                            className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-medium"
                        >
                            View Lists →
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Tasks</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">View and manage all tasks</p>
                        <Link 
                            href="/tasks"
                            className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-medium"
                        >
                            View Tasks →
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow dark:border-sidebar-border dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Create new lists or tasks</p>
                        <div className="mt-4 space-y-2">
                            <Link 
                                href="/lists/create"
                                className="block text-blue-500 hover:text-blue-700 font-medium"
                            >
                                + New List
                            </Link>
                            <Link 
                                href="/tasks/create"
                                className="block text-blue-500 hover:text-blue-700 font-medium"
                            >
                                + New Task
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 md:min-h-min dark:border-sidebar-border dark:bg-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Welcome to Task Management</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        This is your dashboard where you can manage your tasks and lists. 
                        Get started by creating your first task list or viewing your existing tasks.
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h3 className="font-medium text-gray-900 dark:text-white">Task Lists</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Organize your tasks into different lists for better management.
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h3 className="font-medium text-gray-900 dark:text-white">Task Tracking</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Track your tasks with due dates and completion status.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
