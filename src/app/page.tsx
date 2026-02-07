import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <Container size="narrow">
          <div className="relative space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl lg:text-7xl">
                HubSpot contractor services that scale
              </h1>

              <p className="text-xl leading-relaxed text-text-secondary lg:text-2xl">
                Automation, RevOps improvements, and HubSpot builds for teams that want measurable results.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Button href="/services" variant="primary">
                View services
              </Button>

              <Button href="/case-studies" variant="secondary">
                See case studies
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FeatureGrid
        title="Why work with me"
        items={[
          {
            title: "HubSpot expertise",
            description: "Deep knowledge of HubSpot's ecosystem, from automation to custom objects and pipeline optimization.",
          },
          {
            title: "Results-focused approach",
            description: "Every project is measured against clear outcomes and KPIs that matter to your business.",
          },
          {
            title: "Scalable solutions",
            description: "Build systems that grow with your team, not solutions that break when you scale.",
          },
          {
            title: "RevOps mindset",
            description: "Aligned thinking across marketing, sales, and service for unified growth systems.",
          },
        ]}
      />

      <CTASection
        title="Ready to optimize your HubSpot instance?"
        description="Let's discuss how automation and strategic RevOps can accelerate your growth."
        cta={{ label: "Plan a call", href: "/contact" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />
    </main>
  );
}
