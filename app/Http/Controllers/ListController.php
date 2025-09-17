<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TaskList;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = TaskList::where('user_id', auth()->id())->with('tasks')->get();
        return Inertia::render('Lists/Index', ['lists' => $lists, 'flash' => [
            'success' => session('success'),
            'error' => session('error')
        ]]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Lists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $list = new TaskList($request->only('title', 'description'));
        $list->user_id = auth()->id();
        $list->save();

        return redirect()->route('lists.index')->with('success', 'List created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->with('tasks')->findOrFail($id);
        return Inertia::render('Lists/Show', ['list' => $list]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
        return Inertia::render('Lists/Edit', ['list' => $list]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
        $list->update($request->only('title', 'description'));

        return redirect()->route('lists.index')->with('success', 'List updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $list = TaskList::where('user_id', auth()->id())->findOrFail($id);
        $list->delete();

        return redirect()->route('lists.index')->with('success', 'List deleted successfully.');
    }
}
