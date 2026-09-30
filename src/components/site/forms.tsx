import { useId, useState, type FormEvent, type ReactElement } from 'react';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const inputClass = 'form-input';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type FieldName = 'name' | 'email' | 'phone' | 'service' | 'property' | 'date' | 'time' | 'message';
type Errors = { [K in FieldName]?: string | undefined };
type FieldProps = { id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined; 'aria-required': boolean | undefined };

function Field({ label, name, required = false, optional = false, error, children }: { label: string; name: FieldName; required?: boolean; optional?: boolean; error?: string | undefined; children: (props: FieldProps) => ReactElement }) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const errId = `${id}-error`;
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && <span className="required" aria-hidden="true"> *</span>}{optional && <span className="optional"> (optional)</span>}</label>
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': error ? errId : undefined, 'aria-required': required || undefined })}
      {error && <p id={errId} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function validate(form: HTMLFormElement, rules: { name: FieldName; label: string; required?: boolean; type?: 'email' | 'phone' | undefined }[]): Errors {
  const data = new FormData(form);
  const errors: Errors = {};
  for (const r of rules) {
    const value = String(data.get(r.name) ?? '').trim();
    if (!value) { if (r.required) errors[r.name] = r.type ? `Please enter your ${r.label.toLowerCase()}.` : `Please ${r.name === 'message' ? 'tell us how we can help' : `choose ${r.label.toLowerCase()}`}.`; continue; }
    if (r.type === 'email' && !EMAIL_RE.test(value)) errors[r.name] = 'Please enter a valid email address, like you@example.com.';
    if (r.type === 'phone' && value.replace(/\D/g, '').length < 7) errors[r.name] = 'Please enter a valid phone number.';
  }
  return errors;
}

function focusFirstError(form: HTMLFormElement, errors: Errors) {
  const first = Object.keys(errors)[0] ?? '';
  (form.elements.namedItem(first) as HTMLElement | null)?.focus();
}

export function RequestForm({ mode = 'quote' }: { mode?: 'quote' | 'book' }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [dateMin] = useState(() => new Date().toISOString().slice(0, 10));
  function clear(name: FieldName) { if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest); }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, [
      { name: 'name', label: 'Full name', required: true},
      { name: 'email', label: 'Email address', required: true, type: 'email' },
      { name: 'phone', label: 'Phone number', required: true, type: 'phone' },
      { name: 'service', label: 'a service', required: true },
      { name: 'property', label: 'a property type', required: true },
      { name: 'date', label: 'a preferred date', required: true },
      { name: 'time', label: 'a preferred time', required: true },
    ]);
    const date = String(new FormData(form).get('date') ?? '');
    if (date && date < dateMin) found.date = 'Please choose a date that is today or later.';
    if (found.name) found.name = 'Please enter your full name.';
    setErrors(found);
    if (Object.keys(found).length) { focusFirstError(form, found); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (submitted) return (
    <div className="success-state" role="status">
      <CheckCircle2 size={42} strokeWidth={1.5} aria-hidden="true" />
      <p className="eyebrow">REQUEST RECEIVED</p>
      <h2>Thanks for reaching out.</h2>
      <p>Your {mode === 'book' ? 'booking' : 'quote'} request has been recorded in this demo. On a live website, the BrightNest team would follow up to confirm the details. Nothing was sent and no appointment was booked.</p>
      <div className="success-actions">
        <Button asChild><Link to="/">Back to Home <ArrowRight /></Link></Button>
        <Button asChild variant="outline"><Link to="/services">View Our Services <ArrowRight /></Link></Button>
      </div>
    </div>
  );
  return (
    <form className="request-form" onSubmit={submit} noValidate>
      <p className="form-legend"><span className="required" aria-hidden="true">*</span> Required fields</p>
      <div className="form-grid">
        <Field label="Full Name" name="name" required error={errors.name}>{p => <input {...p} className={inputClass} name="name" autoComplete="name" placeholder="Your full name" onChange={() => clear('name')} />}</Field>
        <Field label="Email Address" name="email" required error={errors.email}>{p => <input {...p} className={inputClass} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" onChange={() => clear('email')} />}</Field>
        <Field label="Phone Number" name="phone" required error={errors.phone}>{p => <input {...p} className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" onChange={() => clear('phone')} />}</Field>
        <Field label="Service Needed" name="service" required error={errors.service}>{p => <select {...p} className={inputClass} name="service" defaultValue="" onChange={() => clear('service')}><option value="" disabled>Select a service</option><option>Regular Cleaning</option><option>Deep Cleaning</option><option>Move-In / Move-Out</option><option>Commercial Cleaning</option></select>}</Field>
        <Field label="Property Type" name="property" required error={errors.property}>{p => <select {...p} className={inputClass} name="property" defaultValue="" onChange={() => clear('property')}><option value="" disabled>Select property type</option><option>Apartment</option><option>House</option><option>Office</option><option>Other</option></select>}</Field>
        <Field label="Preferred Date" name="date" required error={errors.date}>{p => <input {...p} className={inputClass} name="date" type="date" min={dateMin} onChange={() => clear('date')} />}</Field>
        <Field label="Preferred Time" name="time" required error={errors.time}>{p => <select {...p} className={inputClass} name="time" defaultValue="" onChange={() => clear('time')}><option value="" disabled>Select a time</option><option>Morning (8am–12pm)</option><option>Afternoon (12pm–4pm)</option><option>Flexible</option></select>}</Field>
      </div>
      <Field label="Anything else we should know?" name="message" optional>{p => <textarea {...p} className={inputClass} name="message" rows={5} placeholder="Tell us a little about your space or any specific requests..." />}</Field>
      <div className="form-submit">
        <Button size="lg" type="submit">{mode === 'book' ? 'Submit Booking Request' : 'Submit Quote Request'} <ArrowRight /></Button>
        <p>No payment required. We’ll confirm availability before anything is booked.</p>
        {mode === 'book'
          ? <p className="form-switch">Not sure what you need yet? <Link to="/quote" className="text-link">Get a Free Quote <ArrowUpRight size={15} /></Link></p>
          : <p className="form-switch">Prefer to pick a date first? <Link to="/book" className="text-link">Book a Cleaning <ArrowUpRight size={15} /></Link></p>}
      </div>
    </form>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  function clear(name: FieldName) { if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest); }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, [
      { name: 'name', label: 'Full name', required: true},
      { name: 'email', label: 'Email address', required: true, type: 'email' },
      { name: 'phone', label: 'Phone number', type: 'phone' },
      { name: 'message', label: 'Message', required: true },
    ]);
    if (found.name) found.name = 'Please enter your full name.';
    setErrors(found);
    if (Object.keys(found).length) { focusFirstError(form, found); return; }
    setSubmitted(true);
  }
  if (submitted) return (
    <div className="success-state" role="status">
      <CheckCircle2 size={40} aria-hidden="true" />
      <h2>Message received.</h2>
      <p>Thanks for getting in touch. This is a demo, so no message was sent to a business.</p>
      <div className="success-actions">
        <Button variant="outline" onClick={() => { setSubmitted(false); setErrors({}); }}>Send another message</Button>
        <Button asChild><Link to="/quote">Get a Free Quote <ArrowRight /></Link></Button>
      </div>
    </div>
  );
  return (
    <>
      <form className="request-form contact-form" onSubmit={submit} noValidate>
        <p className="form-legend"><span className="required" aria-hidden="true">*</span> Required fields</p>
        <div className="form-grid">
          <Field label="Full Name" name="name" required error={errors.name}>{p => <input {...p} className={inputClass} name="name" autoComplete="name" placeholder="Your full name" onChange={() => clear('name')} />}</Field>
          <Field label="Email Address" name="email" required error={errors.email}>{p => <input {...p} className={inputClass} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" onChange={() => clear('email')} />}</Field>
        </div>
        <Field label="Phone Number" name="phone" optional error={errors.phone}>{p => <input {...p} className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" onChange={() => clear('phone')} />}</Field>
        <Field label="How can we help?" name="message" required error={errors.message}>{p => <textarea {...p} className={inputClass} name="message" rows={6} placeholder="Ask a question about our services, availability, or service areas..." onChange={() => clear('message')} />}</Field>
        <Button type="submit" size="lg">Send Message <ArrowRight /></Button>
      </form>
      <aside className="contact-alt" aria-label="Request a quote instead">
        <div><h3>Need a cleaning quote instead?</h3><p>Use our quote form for cleaning requests. This form is for general questions.</p></div>
        <Button asChild size="lg" variant="outline"><Link to="/quote">Get a Free Quote <ArrowUpRight /></Link></Button>
      </aside>
    </>
  );
}
