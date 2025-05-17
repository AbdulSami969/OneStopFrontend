"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define types for form data
interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  width?: "full" | "half";
}

interface FormButton {
  text: string;
  loadingText: string;
}

interface ContactFormProps {
  formData?: {
    fields?: FormField[];
    submitButton?: FormButton;
    successMessage?: string;
    errorMessage?: string;
  };
}

export default function ContactForm({ formData }: ContactFormProps) {
  // Initialize an empty form state
  const initialFormState: Record<string, string> = {};

  // If we have form fields from Sanity, set up the initial state based on those
  const formFields = formData?.fields || [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
      width: "full",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your@email.com",
      required: true,
      width: "half",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "(518) 123-4567",
      required: true,
      width: "half",
    },
    {
      name: "service",
      label: "Service Needed",
      type: "select",
      required: true,
      width: "full",
      options: ["General Inquiry", "Request a Quote", "Bed Bug Treatment", "Residential Service", "Commercial Service", "Emergency Service", "Other"],
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Please describe your pest problem or inquiry...",
      required: true,
      width: "full",
    },
  ];

  // Initialize form state with empty values for each field
  formFields.forEach((field) => {
    initialFormState[field.name] = "";
  });

  const [formState, setFormState] = useState<Record<string, string>>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setFormState((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorDetails("");

    try {
      // Send form data to the API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      // Reset form after successful submission
      setFormState(initialFormState);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorDetails(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Button text from Sanity or fallbacks
  const buttonText = formData?.submitButton?.text || "Send Message";
  const loadingText = formData?.submitButton?.loadingText || "Sending...";
  const successMessage = formData?.successMessage || "Your message has been sent successfully. We'll get back to you as soon as possible.";
  const errorMessage = formData?.errorMessage || "There was a problem sending your message. Please try again or contact us directly by phone.";

  // Render form fields dynamically based on Sanity data
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {formFields.map((field, index) => {
          // For half-width fields, we need to create a grid
          const isHalfWidth = field.width === "half";
          const nextFieldIsHalfWidth = index < formFields.length - 1 && formFields[index + 1].width === "half";

          // Skip rendering this field if it's the second of a pair of half-width fields (we'll render both in a grid)
          if (isHalfWidth && index > 0 && formFields[index - 1].width === "half") {
            return null;
          }

          // Render a grid for half-width fields
          if (isHalfWidth && nextFieldIsHalfWidth) {
            const currentField = field;
            const nextField = formFields[index + 1];

            return (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current field */}
                <div>
                  <label htmlFor={currentField.name} className="block text-sm font-medium mb-1">
                    {currentField.label} {currentField.required && <span className="text-pest-red">*</span>}
                  </label>
                  {currentField.type === "text" || currentField.type === "email" || currentField.type === "tel" ? <Input id={currentField.name} name={currentField.name} type={currentField.type} value={formState[currentField.name]} onChange={handleChange} required={currentField.required} className="w-full" placeholder={currentField.placeholder} /> : null}
                </div>

                {/* Next field */}
                <div>
                  <label htmlFor={nextField.name} className="block text-sm font-medium mb-1">
                    {nextField.label} {nextField.required && <span className="text-pest-red">*</span>}
                  </label>
                  {nextField.type === "text" || nextField.type === "email" || nextField.type === "tel" ? <Input id={nextField.name} name={nextField.name} type={nextField.type} value={formState[nextField.name]} onChange={handleChange} required={nextField.required} className="w-full" placeholder={nextField.placeholder} /> : null}
                </div>
              </div>
            );
          }

          // Skip if we've just rendered this field as part of a half-width pair
          if (isHalfWidth && nextFieldIsHalfWidth) {
            return null;
          }

          // Standard full-width field
          return (
            <div key={index}>
              <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                {field.label} {field.required && <span className="text-pest-red">*</span>}
              </label>

              {field.type === "text" || field.type === "email" || field.type === "tel" ? (
                <Input id={field.name} name={field.name} type={field.type} value={formState[field.name]} onChange={handleChange} required={field.required} className="w-full" placeholder={field.placeholder} />
              ) : field.type === "textarea" ? (
                <Textarea id={field.name} name={field.name} value={formState[field.name]} onChange={handleChange} required={field.required} className="w-full min-h-[150px]" placeholder={field.placeholder} />
              ) : field.type === "select" ? (
                <Select value={formState[field.name]} onValueChange={(value) => handleSelectChange(value, field.name)} required={field.required}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </div>
          );
        })}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-pest-red hover:bg-pest-red/90 text-white py-3">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          buttonText
        )}
      </Button>

      {submitStatus === "success" && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
            {errorDetails && <div className="mt-2 text-sm">{errorDetails}</div>}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
