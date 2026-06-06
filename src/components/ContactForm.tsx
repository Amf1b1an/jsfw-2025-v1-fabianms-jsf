"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (fieldName: string, value: string) => {
    let newError = "";
    const trimmed = value.trim();

    switch (fieldName) {
      case "fullName":
        if (!trimmed) {
          newError = "Name is required.";
        } else if (trimmed.length < 3) {
          newError = "Name must be at least 3 characters.";
        }
        break;
      case "subject":
        if (trimmed.length < 3) {
          newError = "Subject must be at least 3 characters.";
        }
        break;
      case "email":
        if (!trimmed) {
          newError = "E-mail is required.";
        } else if (!EMAIL_REGEX.test(trimmed)) {
          newError = 'Invalid format. Use "name@domain.com"';
        }
        break;
      case "message":
        if (trimmed.length < 10) {
          newError = "Message must be at least 10 characters.";
        }
        break;
      default:
        break;
    }
    return newError;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, (formData as any)[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Validated contact message:", formData);
      alert(`Thank you, ${formData.fullName}. Your message has been sent.`);

      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setErrors({});

      router.push("/message-sent");
    } else {
      console.log("Validation failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 max-w-md mx-auto p-8 bg-sky-950 shadow-lg rounded-xl text-white mt-5"
    >
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {/* Full Name */}
      <div className="space-y-1">
        <label htmlFor="fullName" className="block text-sm font-semibold">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 text-black border-2 border-transparent focus:border-cyan-500 outline-none"
          placeholder="Min 3 characters"
        />
        {errors.fullName && (
          <p className="text-red-400 text-[0.85em] font-medium m-0">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold">
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-black outline-none focus:border-cyan-500"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-[0.85em] font-medium m-0">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-1">
        <label htmlFor="subject" className="block text-sm font-semibold">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 text-black outline-none focus:border-cyan-500"
          placeholder="Min 3 characters"
        />
        {errors.subject && (
          <p className="text-red-400 text-[0.85em] font-medium m-0">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-semibold">
          Your Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type here... min 10 characters"
          className="w-full min-h-24 bg-white border-2 border-black text-black p-3 rounded-lg outline-none focus:border-cyan-500"
        />
        {errors.message && (
          <p className="text-red-400 text-[0.85em] font-medium m-0">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 bg-white text-sky-950 p-3 rounded-lg font-bold hover:bg-cyan-100 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
