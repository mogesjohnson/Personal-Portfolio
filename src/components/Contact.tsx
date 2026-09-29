import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="pt-12 pb-8 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold">
          05 // Contact &amp; Outreach
        </h2>
        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          Get in Touch
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
