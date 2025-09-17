<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\TaskList;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->with('list')->get();
        
        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lists = TaskList::where('user_id', auth()->id())->get();
        return Inertia::render('Tasks/Create', ['lists' => $lists]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date' => 'nullable|date',
            'list_id' => 'required|exists:lists,id',
        ]);

        $list = TaskList::where('user_id', auth()->id())->findOrFail($request->list_id);
        
        $task = new Task($request->only('title', 'description', 'due_date', 'list_id'));
        $task->is_completed = false;
        $task->save();

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->with('list')->findOrFail($id);
        
        return Inertia::render('Tasks/Show', ['task' => $task]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $task = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->findOrFail($id);
        
        $lists = TaskList::where('user_id', auth()->id())->get();
        
        return Inertia::render('Tasks/Edit', ['task' => $task, 'lists' => $lists]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'due_date' => 'nullable|date',
            'is_completed' => 'boolean',
            'list_id' => 'required|exists:lists,id',
        ]);

        $task = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->findOrFail($id);
        
        TaskList::where('user_id', auth()->id())->findOrFail($request->list_id);
        
        $task->update($request->only('title', 'description', 'due_date', 'is_completed', 'list_id'));

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->findOrFail($id);
        
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
    
    /**
     * Toggle task completion status.
     */
    public function toggle(Request $request, string $id)
    {
        $task = Task::whereHas('list', function ($query) {
            $query->where('user_id', auth()->id());
        })->findOrFail($id);
        
        $task->is_completed = !$task->is_completed;
        $task->save();

        return redirect()->back()->with('success', 'Task status updated successfully.');
    }
}
