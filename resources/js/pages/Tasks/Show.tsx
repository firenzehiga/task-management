import { Head, Link } from '@inertiajs/react';
import type { Task } from '@/types';

interface ShowTaskProps {
  task: Task;
}

export default function ShowTask({ task }: ShowTaskProps) {
  return (
    <>
      <Head title={task.title} />
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link
            href={route('tasks.index')}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Tasks
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {task.title}
              </h1>
              {task.is_completed ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                  In Progress
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Link
                href={route('tasks.edit', task.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Task
              </Link>
            </div>
          </div>

          {task.description && (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Description
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {task.description}
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Due Date
              </h3>
              <p className="mt-1 text-gray-900 dark:text-white">
                {task.due_date 
                  ? new Date(task.due_date).toLocaleDateString() 
                  : 'No due date'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                List
              </h3>
              <p className="mt-1 text-gray-900 dark:text-white">
                {task.list?.title || 'No list assigned'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Created
            </h3>
            <p className="mt-1 text-gray-900 dark:text-white">
              {new Date(task.created_at).toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Updated
            </h3>
            <p className="mt-1 text-gray-900 dark:text-white">
              {new Date(task.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}