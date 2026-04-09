"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Plus, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: number;
  note: string;
  createdAt: Date;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
}

interface CustomerNotesProps {
  customerId: string;
  currentUserId?: number; // Admin user adding the note
}

export function CustomerNotes({ customerId, currentUserId = 1 }: CustomerNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [customerId]);

  async function fetchNotes() {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}/notes`);
      const data = await response.json();

      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();

    if (!newNote.trim()) {
      toast.error('Please enter a note');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/customers/${customerId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: newNote,
          createdBy: currentUserId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Note added successfully');
        setNewNote('');
        setShowAddForm(false);
        fetchNotes();
      } else {
        toast.error('Failed to add note');
      }
    } catch (error) {
      toast.error('Failed to add note');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Admin Notes
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Internal notes about this customer
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                New Note
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
                placeholder="Enter a note about this customer..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                {submitting ? 'Saving...' : 'Save Note'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewNote('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      <div className="p-6">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="w-12 h-12 mb-4 text-gray-400" />
            <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No Notes Yet
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add internal notes about this customer for your team.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {note.createdBy.name || note.createdBy.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(note.createdAt), 'PPP p')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {note.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
