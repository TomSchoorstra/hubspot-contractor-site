"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";

/* ─── Animation variants ─────────────────────────────────────────── */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

/* ─── Tool stack logos (text-based, no external images) ─────────── */
const tools = ["HubSpot", "Zapier", "Exact", "WooCommerce", "Google Workspace", "Slack", "Jira"];

/* ─── Home results stats ─────────────────────────────────────────── */
const homeStats = [
  { value: 15, unit: "hrs/week", label: "Saved per automation project" },
  { value: 50, unit: "%", label: "Faster reporting after CRM cleanup" },
  { value: 3, unit: "systems", label: "Connected in a single workflow" },
];

export default function Home() {
  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden flex items-center">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        {/* Orange glow blob */}
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent-2/6 blur-[80px] pointer-events-none" />

        <Container className="relative z-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-16 xl:grid-cols-[3fr_2fr] xl:items-center">
            {/* Left: Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={staggerItem}>
                <Badge variant="teal">Independent HubSpot Contractor</Badge>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                HubSpot operations,{" "}
                <span className="text-gradient-orange">done right.</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="max-w-xl text-xl leading-relaxed text-text-secondary lg:text-2xl"
              >
                I help growing teams turn HubSpot into a system that actually drives results — through automation, clean data, and integrations that stick.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col gap-4 sm:flex-row sm:gap-4"
              >
                <Button href="/contact" variant="primary" size="lg" showArrow>
                  Plan a call
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  See the work
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Geometric decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative hidden xl:block"
            >
              {/* Layered circles */}
              <div className="relative mx-auto h-[380px] w-[380px]">
                <div className="absolute inset-0 rounded-full border-2 border-accent/10" />
                <div className="absolute inset-8 rounded-full border-2 border-accent-2/15" />
                <div className="absolute inset-16 rounded-full bg-accent/6" />
                <div className="absolute inset-24 rounded-full bg-accent-2/8" />

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-2xl bg-accent shadow-lg flex items-center justify-center">
                    <svg aria-hidden="true" className="h-8 w-8 text-white" fill="none" viewBox="0 0 32 32">
                      <path d="M8 16h16M16 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-8 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg"
                >
                  <div className="text-xs font-medium text-text-muted">Time saved</div>
                  <div className="font-display text-xl font-bold text-accent">15 hrs/week</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -right-8 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg"
                >
                  <div className="text-xs font-medium text-text-muted">Reporting speed</div>
                  <div className="font-display text-xl font-bold text-accent-2">50% faster</div>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-16 -translate-y-1/2 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg"
                >
                  <div className="text-xs font-medium text-text-muted">Systems connected</div>
                  <div className="font-display text-xl font-bold text-text">3 in 1</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══ TOOL STACK BAR ══════════════════════════════════════════ */}
      <div className="border-y border-border bg-surface-2 py-6">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Works with your stack
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-sm font-semibold text-text-muted/70 transition-colors hover:text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ═══ SERVICES PREVIEW ════════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <Container>
          <ScrollReveal>
            <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  What I do
                </p>
                <h2 className="font-display text-4xl font-bold text-text lg:text-5xl">
                  Five ways I can help
                </h2>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
              >
                View all services
                <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                    <div className="mb-5 font-display text-4xl font-extrabold text-border">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-bold text-text transition-colors group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {service.shortDescription}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Learn more
                      <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-surface-2">
        <Container>
          <ScrollReveal>
            <div className="mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Clients
              </p>
              <h2 className="font-display text-4xl font-bold text-text lg:text-5xl">
                What clients say
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "What used to take our finance team an entire day now runs automatically. We don't even think about it anymore. The automation Tom built is rock solid.",
                name: "Tom",
                title: "System Operations Manager",
                company: "Academy to Innovate HR",
              },
              {
                quote: "We finally have a HubSpot setup that reflects how we actually work. Tom asked the right questions, moved fast, and didn't overcomplicate a single thing.",
                name: "Sarah",
                title: "RevOps Lead",
                company: "SaaS scale-up",
              },
              {
                quote: "Our pipeline was a mess — duplicate deals, no clear stages, reporting nobody trusted. In a few weeks Tom turned it into something we can actually rely on.",
                name: "Mark",
                title: "Sales Director",
                company: "B2B software company",
              },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-8">
                  <svg aria-hidden="true" className="mb-5 h-8 w-8 text-accent/30" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                  <p className="flex-1 text-base italic leading-relaxed text-text-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border pt-5">
                    <div className="font-semibold text-text">{t.name}</div>
                    <div className="mt-0.5 text-sm text-text-muted">{t.title}, {t.company}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ RESULTS SECTION (teal bg) ═══════════════════════════════ */}
      <section className="bg-accent-2 py-20">
        <Container>
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
              Real outcomes
            </p>
            <h2 className="font-display text-3xl font-bold text-white mb-14 lg:text-4xl">
              Numbers from recent projects
            </h2>
          </ScrollReveal>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {homeStats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-6xl font-extrabold text-white leading-none">
                      <AnimatedNumber value={stat.value} />
                    </span>
                    <span className="font-display text-2xl font-bold text-white/80 leading-none">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/70">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ CASE STUDIES PREVIEW ════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <Container>
          <ScrollReveal>
            <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                  Case studies
                </p>
                <h2 className="font-display text-4xl font-bold text-text lg:text-5xl">
                  Work that speaks<br className="hidden sm:block" /> for itself
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
              >
                All case studies
                <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {caseStudies.slice(0, 2).map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.1}>
                <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
                    {/* Result badge */}
                    <div className="mb-6">
                      <Badge variant="orange">{study.results[0].value}</Badge>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-text transition-colors group-hover:text-accent">
                      {study.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      {study.summary}
                    </p>
                    {/* Tech stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <Badge key={tech} variant="teal" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Read case study
                      <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ CTA SECTION ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-accent-light border-2 border-accent/15 px-8 py-14 lg:px-14">
              {/* Background decoration */}
              <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/6 blur-[60px] pointer-events-none" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-display text-3xl font-bold text-text lg:text-4xl">
                    Ready to get more out of HubSpot?
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                    Let&apos;s talk about your setup. No fluff, no hard sell — just an honest conversation about what&apos;s possible.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
                  <Button href="/contact" variant="primary" size="lg" showArrow>
                    Start the conversation
                  </Button>
                  <Button href="/services" variant="secondary" size="lg">
                    View services
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
