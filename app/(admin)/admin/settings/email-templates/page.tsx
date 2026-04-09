"use client";

import { useEffect, useState } from "react";
import { EmailTemplate } from "@/lib/types/settings";
import { EmailTemplateEditor } from "@/components/admin/settings/EmailTemplateEditor";
import { Mail, Edit } from "lucide-react";
import { toast } from "sonner";

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/admin/settings/email-templates");
      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Failed to load email templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
  };

  const handleSuccess = () => {
    setEditingTemplate(null);
    fetchTemplates();
  };

  const handleCancel = () => {
    setEditingTemplate(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-50 dark:bg-pink-900/20">
          <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Email Templates
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Customize email templates for orders and notifications
          </p>
        </div>
      </div>

      {editingTemplate ? (
        <EmailTemplateEditor
          template={editingTemplate}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {/* Info Box */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                  Email Templates
                </h4>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  Customize the emails sent to customers for order confirmations, shipping updates,
                  and more. Use variables to personalize each email with customer and order data.
                </p>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.slug}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                      <Mail className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      {template.isActive ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {template.subject}
                </p>

                <button
                  onClick={() => handleEdit(template)}
                  className="flex items-center gap-2 w-full justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Template
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
