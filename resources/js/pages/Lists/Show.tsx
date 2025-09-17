import { Head, Link } from '@inertiajs/react';
import type { TaskList } from '@/types';

interface ShowListProps {
  list: TaskList;
}

export default function ShowList({ list }: ShowListProps) {
  return (
    <>
      <Head title={list.title} />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link
            href={route('lists.index')}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Lists
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{list.title}</h1>
                {list.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{list.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Link
                  href={route('lists.edit', list.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit List
                </Link>
                <Link
                  href={route('tasks.create')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Task
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tasks ({list.tasks?.length || 0})
              </h2>

              {list.tasks && list.tasks.length > 0 ? (
                <div className="space-y-4">
                  {list.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No tasks in this list yet.</p>
                  <Link
                    href={route('tasks.create')}
                    className="mt-4 inline-block text-blue-500 hover:text-blue-700"
                  >
                    Create your first task
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}