import PageHeader from "@/components/sections/PageHeader";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";

export default function Contact() {
  return (
    <main>
      <PageHeader
        title="Contact"
        subtitle="Tell me about your project or challenge. I'll get back to you within one business day."
        secondaryCta={{ label: "View services", href: "/services" }}
      />

      <section className="py-16 lg:py-20">
        <Container size="narrow">
          <Card>
            <ContactForm />
          </Card>
        </Container>
      </section>
    </main>
  );
}
