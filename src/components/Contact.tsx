import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="pt-20 pb-8 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-xs uppercase tracking-wider font-semibold section-eyebrow">
          05 // Contact &amp; Outreach
        </h2>
        <p className="mt-2 font-bold text-slate-900 dark:text-slate-100 section-title">
          Get in Touch
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
