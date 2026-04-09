"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailTemplate, emailTemplateSchema } from "@/lib/types/settings";
import { toast } from "sonner";
import { Save, X, Send, Eye, Code } from "lucide-react";
import { useState } from "react";

interface EmailTemplateEditorProps {
  template: EmailTemplate;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EmailTemplateEditor({
  template,
  onSuccess,
  onCancel,
}: EmailTemplateEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [testEmail, setTestEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailTemplate>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: template,
  });

  const htmlContent = watch("htmlContent");

  const onSubmit = async (data: EmailTemplate) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/settings/email-templates/${data.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update template");
      }

      toast.success("Email template updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendTest = async () => {
    if (!testEmail) {
      toast.error("Please enter a test email address");
      return;
    }

    try {
      const response = await fetch("/api/admin/settings/email-templates/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateSlug: template.slug,
          email: testEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send test email");
      }

      toast.success(`Test email sent to ${testEmail}`);
    } catch (error) {
      console.error("Error sending test email:", error);
      toast.error("Failed to send test email");
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#htmlContent");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      textarea.value = before + variable + after;
      textarea.selectionStart = textarea.selectionEnd = start + variable.length;
      textarea.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Template Info */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Template Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Line
            </label>
            <input
              type="text"
              {...register("subject")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.subject.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              You can use variables like {template.variables.join(", ")}
            </p>
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Template is active
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Variable Picker */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Available Variables
        </h4>
        <div className="flex flex-wrap gap-2">
          {template.variables.map((variable) => (
            <button
              key={variable}
              type="button"
              onClick={() => insertVariable(variable)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-gray-100 hover:bg-gray-200 text-gray-700 rounded dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
            >
              <Code className="w-3 h-3" />
              {variable}
            </button>
          ))}
        </div>
      </div>

      {/* HTML Editor */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            HTML Content
          </h3>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {showPreview ? (
          <div className="rounded-lg border border-gray-300 p-4 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        ) : (
          <textarea
            id="htmlContent"
            {...register("htmlContent")}
            rows={15}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        )}
        {errors.htmlContent && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.htmlContent.message}
          </p>
        )}
      </div>

      {/* Test Email */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Send Test Email
        </h3>
        <div className="flex gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={handleSendTest}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Test
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save Template"}
        </button>
      </div>
    </form>
  );
}
