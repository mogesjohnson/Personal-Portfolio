"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Calendar, Copy, Check } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Full-Time SWE Opportunity",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate instant secure submission or direct mailto dispatch
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Left Side: Direct Contact Details & Scheduling */}
      <div className="lg:col-span-5 space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Let&apos;s Connect
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            I respond within 24 hours. Whether you have an open engineering role, a high-scale architecture project, or want to discuss technical systems, I&apos;d love to talk.
          </p>
        </div>

        {/* Quick Email Copy Box */}
        <div className="card card-sm p-4 space-y-2 text-xs ">
          <span className="text-slate-500 text-[11px] block">DIRECT EMAIL</span>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              {personalInfo.socialLinks.email}
            </span>
            <button
              type="button"
              onClick={copyEmail}
              className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors"
              title="Copy email address"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* 1-Click Scheduling */}
        <div className="card card-sm p-4 space-y-2 text-xs ">
          <span className="text-slate-500 text-[11px] block">CALENDAR DISPATCH</span>
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            Schedule a 15-minute technical intro chat directly on my calendar.
          </p>
          <a
            href={personalInfo.socialLinks.calendar}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Open Cal.com Scheduler ↗</span>
          </a>
        </div>
      </div>

      {/* Form Right Side: Interactive Form */}
      <div className="lg:col-span-7 card p-6">
        {status === "success" ? (
          <div className="p-6 text-center space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Message Received
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out, {formData.name}! I have received your note regarding &ldquo;{formData.inquiryType}&rdquo; and will respond to {formData.email} promptly.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", inquiryType: "Full-Time SWE Opportunity", message: "" });
              }}
              className="mt-3 text-xs text-amber-600 dark:text-amber-400 hover:underline"
            >
              Send another message &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs ">
            {status === "error" && (
              <div className="flex items-center gap-2 p-2.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Please fill out all required fields before submitting.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 block font-semibold">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 block font-semibold">
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sconnor@company.com"
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 block font-semibold">
                INQUIRY TOPIC
              </label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-slate-100 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none"
              >
                <option value="Full-Time SWE Opportunity">Full-Time Software Engineering Opportunity</option>
                <option value="Summer/Fall 2026 Internship">Summer/Fall 2026 SWE Internship</option>
                <option value="Technical Collaboration">Technical Architecture / Open Source</option>
                <option value="General Engineering Chat">General Engineering Chat</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 block font-semibold">
                MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share details about the role, project, or topic..."
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg btn-primary text-slate-950 font-bold px-6 py-2.5 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{status === "submitting" ? "Sending..." : "Dispatch Message"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
