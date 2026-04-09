'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

// Irish phone number regex (flexible format)
// Accepts formats like: +353 1 234 5678, 01 234 5678, 0851234567, etc.
const irishPhoneRegex = /^(\+353|0)[1-9]\d{7,9}$/;

// Contact form schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || irishPhoneRegex.test(val.replace(/\s/g, '')),
      'Please enter a valid Irish phone number'
    ),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((val) => val === true, 'You must agree to be contacted'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      consent: false,
    },
  });

  const consentValue = watch('consent');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();

      // Redirect or clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center animate-in fade-in duration-500">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-600 animate-in zoom-in duration-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your message has been sent successfully. We'll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Error sending message</p>
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
            className="mt-1.5"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1.5">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Smith"
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
            className="mt-1.5"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1.5">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.smith@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
          className="mt-1.5"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+353 1 234 5678"
          {...register('phone')}
          aria-invalid={!!errors.phone}
          className="mt-1.5"
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1.5">{errors.phone.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1.5">
          Irish phone numbers only (e.g., +353 1 234 5678)
        </p>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help you..."
          rows={5}
          {...register('message')}
          aria-invalid={!!errors.message}
          className="mt-1.5"
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1.5">{errors.message.message}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={consentValue}
          onCheckedChange={(checked) => setValue('consent', checked === true)}
          aria-invalid={!!errors.consent}
        />
        <div className="flex-1">
          <Label
            htmlFor="consent"
            className="text-sm font-normal cursor-pointer leading-relaxed"
          >
            I agree to be contacted about PUXX products{' '}
            <span className="text-red-500">*</span>
          </Label>
          {errors.consent && (
            <p className="text-sm text-red-600 mt-1">{errors.consent.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 h-auto text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}
