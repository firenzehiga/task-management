import { Head, Link } from '@inertiajs/react';
import type { Task } from '@/types';

interface TasksIndexProps {
  tasks: Task[];
}

export default function TasksIndex({ tasks }: TasksIndexProps) {
  return (
    <>
      <Head title="Tasks" />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Tasks</h1>
          <Link
            href={route('tasks.create')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Task
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
            <Link
              href={route('tasks.create')}
              className="mt-4 inline-block text-blue-500 hover:text-blue-700"
            >
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${
                  task.is_completed ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => {}}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <div className="ml-4">
                    <h3
                      className={`text-lg font-medium ${
                        task.is_completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`mt-1 text-sm ${
                          task.is_completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                    {task.due_date && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      In list: {task.list?.title}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={route('tasks.edit', task.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route('tasks.destroy', task.id)}
                    method="delete"
                    as="button"
                    type="button"
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}