import type { TaskList } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface ListsIndexProps {
    lists: TaskList[];
    flash: {
        success?: string;
        error?: string;
    };
}

export default function ListsIndex({ lists, flash }: ListsIndexProps) {
    return (
        <>
            <Head title="Task Lists" />
            <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Lists</h1>
                    <Link href={route('lists.create')} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Create New List
                    </Link>
                </div>

                {flash.success && <div className="mb-4 rounded border border-green-400 bg-green-100 p-4 text-green-700">{flash.success}</div>}

                {flash.error && <div className="mb-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">{flash.error}</div>}

                {lists.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No task lists found.</p>
                        <Link href={route('lists.create')} className="mt-4 inline-block text-blue-500 hover:text-blue-700">
                            Create your first list
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {lists.map((list) => (
                            <div key={list.id} className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{list.title}</h2>
                                        <div className="flex space-x-2">
                                            <Link href={route('lists.edit', list.id)} className="text-blue-500 hover:text-blue-700">
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('lists.destroy', list.id)}
                                                method="delete"
                                                as="button"
                                                type="button"
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                    {list.description && <p className="mt-2 text-gray-600 dark:text-gray-300">{list.description}</p>}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{list.tasks?.length || 0} tasks</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={route('lists.show', list.id)} className="font-medium text-blue-500 hover:text-blue-700">
                                            View List →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
