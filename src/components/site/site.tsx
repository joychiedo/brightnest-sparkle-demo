import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Instagram, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/brightnest-hero.jpg';
import kitchen from '@/assets/brightnest-kitchen.jpg';
import cleaner from '@/assets/brightnest-cleaner.jpg';
import office from '@/assets/brightnest-office.jpg';

export const images = { hero, kitchen, cleaner, office };
export const nav = [
  { label: 'Home', to: '/' as const }, { label: 'Services', to: '/services' as const },
  { label: 'About', to: '/about' as const }, { label: 'Service Areas', to: '/service-areas' as const },
  { label: 'Reviews', to: '/reviews' as const }, { label: 'Contact', to: '/contact' as const },
];
export const services = [
  { title: 'Regular Cleaning', slug: 'regular-cleaning', description: 'A dependable clean that keeps everyday life feeling lighter.', detail: 'Consistent care for the spaces you use most, on a schedule that works for your household.', ideal: 'Busy households who want a home that stays comfortably clean.', image: hero, alt: 'Cleaner caring for a bright living room', included: ['Kitchen surfaces', 'Bathrooms', 'Dusting', 'Vacuuming & mopping', 'General tidying', 'High-touch areas'] },
  { title: 'Deep Cleaning', slug: 'deep-cleaning', description: 'A more detailed reset for the spaces that need extra attention.', detail: 'An intentional, top-to-bottom clean that gets into the details regular visits might not cover.', ideal: 'Seasonal resets, special occasions, or your first BrightNest visit.', image: cleaner, alt: 'Professional cleaner wiping a bright bathroom sink', included: ['Kitchen surfaces', 'Bathrooms', 'Floors', 'Detailed dusting', 'High-touch areas', 'Detailed room cleaning'] },
  { title: 'Move-In / Move-Out', slug: 'move-in-move-out', description: 'A fresh start for your next chapter, on either side of the move.', detail: 'Thorough cleaning for empty homes, helping you settle in or leave a place ready for its next occupants.', ideal: 'Renters, homeowners, and property managers between moves.', image: kitchen, alt: 'Freshly cleaned sunlit kitchen', included: ['Inside cabinets', 'Kitchen & appliances', 'Bathrooms', 'Baseboards', 'Floors', 'Empty-room detailing'] },
  { title: 'Commercial Cleaning', slug: 'commercial-cleaning', description: 'Thoughtful upkeep for offices and small business spaces.', detail: 'A clean workplace makes a better impression and gives your team room to focus.', ideal: 'Small offices, studios, and local businesses.', image: office, alt: 'Freshly cleaned sunlit small office', included: ['Work surfaces', 'Shared areas', 'Restrooms', 'Floors', 'Trash removal', 'High-touch areas'] },
];
export const areas = [
  { name: 'Downtown', detail: 'Dependable cleaning for city apartments, offices, and busy households.' },
  { name: 'Westside', detail: 'Thoughtful home care for the neighborhoods on the west side.' },
  { name: 'North Hills', detail: 'Flexible visits for family homes and growing communities.' },
  { name: 'Brookfield', detail: 'Regular and one-time cleaning for homes across Brookfield.' },
  { name: 'Lakeside', detail: 'A fresh, reliable clean for homes near the water.' },
  { name: 'Eastwood', detail: 'Cleaning that fits the rhythm of life in Eastwood.' },
];
export const reviews = [
  { quote: 'BrightNest has made keeping our home clean so much easier. The team is reliable, professional, and always thorough.', name: 'Sarah M.', location: 'Westside', service: 'Regular Cleaning' },
  { quote: 'We booked a deep clean before having family over, and the difference was incredible. Every room felt cared for.', name: 'Daniel R.', location: 'North Hills', service: 'Deep Cleaning' },
  { quote: 'Moving is stressful enough. BrightNest took one big thing off our list and left the place looking wonderful.', name: 'Priya L.', location: 'Brookfield', service: 'Move-Out Cleaning' },
  { quote: 'Scheduling was simple, communication was clear, and our office has felt consistently welcoming ever since.', name: 'Alex T.', location: 'Downtown', service: 'Commercial Cleaning' },
  { quote: 'They show up when they say they will and pay attention to the little details. That matters to us.', name: 'Morgan C.', location: 'Lakeside', service: 'Regular Cleaning' },
  { quote: 'Our new place truly felt like a fresh start after BrightNest finished. I would happily book them again.', name: 'Jamie P.', location: 'Eastwood', service: 'Move-In Cleaning' },
];

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="BrightNest Cleaning Co. home"><span className="brand-mark" aria-hidden="true"><span className="brand-roof" /><span className="brand-spark">✦</span></span><span className="brand-words"><strong>BrightNest</strong><small>CLEANING CO.</small></span></Link>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [open]);
  return <header className="site-header"><div className="header-inner container"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: 'active', 'aria-current': 'page' }}>{item.label}</Link>)}</nav><div className="header-actions"><Button asChild className="header-quote"><Link to="/quote">Get a Free Quote <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: 'active', 'aria-current': 'page' }} onClick={() => setOpen(false)}>{item.label}<ChevronRight size={18} /></Link>)}<Button asChild><Link to="/quote" onClick={() => setOpen(false)}>Get a Free Quote <ArrowUpRight /></Link></Button></nav>}</header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-about"><Brand inverse /><p>A cleaner home. A better everyday. Thoughtful cleaning for local homes and businesses.</p></div><div><h3>Explore</h3>{nav.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div><div><h3>Services</h3>{services.map(s => <Link key={s.slug} to="/services" hash={s.slug}>{s.title}</Link>)}</div><div><h3>Get in touch</h3><a href="tel:+15550134820">(555) 013-4820</a><a href="mailto:hello@brightnest.example">hello@brightnest.example</a><p>Serving Downtown, Westside, North Hills, Brookfield, Lakeside & Eastwood</p><h3 className="footer-hours-title">Hours</h3><p>Monday–Friday · 8am–6pm<br />Saturday · 9am–3pm<br />Sunday · Closed</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} BrightNest Cleaning Co. All rights reserved.</span><span>Fictional business · Website concept</span></div></footer>;
}
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{description}</p></div></section>;
}
export function SectionHead({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="section-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}
export function TextLink({ to, children }: { to: '/services' | '/about' | '/service-areas' | '/reviews' | '/quote' | '/contact'; children: React.ReactNode }) {
  return <Link to={to} className="text-link">{children}<ArrowUpRight size={17} /></Link>;
}
export function ServiceCard({ service }: { service: typeof services[number] }) {
  return <article className="service-card"><Link to="/services" hash={service.slug} aria-hidden="true" tabIndex={-1} className="service-image-link"><img src={service.image} alt={service.alt} loading="lazy" width={1200} height={900} /></Link><div className="service-card-body"><h3>{service.title}</h3><p>{service.description}</p><Link to="/services" hash={service.slug} className="text-link">Learn more<span className="sr-only"> about {service.title}</span> <ArrowUpRight size={17} aria-hidden="true" /></Link></div></article>;
}
export function ReviewCard({ review }: { review: typeof reviews[number] }) {
  return <article className="review-card"><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{review.quote}”</blockquote><div className="review-person"><strong>{review.name}</strong><span>{review.location} · {review.service}</span></div></article>;
}
export function DemoNote() {
  return <p className="demo-note">Customer names and reviews are fictional and shown for demonstration purposes.</p>;
}
export function FinalCTA() {
  return <section className="final-cta"><div className="container final-cta-inner"><div><p className="eyebrow">LET'S GET STARTED</p><h2>Ready for a Cleaner Space?</h2><p>Tell us what you need cleaned and we’ll help you find the right service for your space.</p></div><div className="cta-actions"><Button asChild size="lg"><Link to="/quote">Get a Free Quote <ArrowUpRight /></Link></Button><Button asChild size="lg" variant="outline"><Link to="/book">Book a Cleaning <ArrowRight /></Link></Button></div></div></section>;
}
export function Checklist({ items }: { items: string[] }) { return <ul className="checklist">{items.map(item => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>; }
export function ArrowButton({ to, children, variant = 'default' }: { to: '/quote' | '/book' | '/services' | '/contact'; children: React.ReactNode; variant?: 'default' | 'outline' }) { return <Button asChild size="lg" variant={variant}><Link to={to}>{children}<ArrowUpRight /></Link></Button>; }
