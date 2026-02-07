"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center py-20">
      <Container size="narrow">
        <Card className="text-center">
          <div className="mb-6 text-5xl">⚠️</div>
          <h1 className="mb-4 text-3xl font-bold text-text">
            Something went wrong
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-text-secondary">
            Something unexpected happened. Please try again, or head back to the homepage.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button onClick={reset} variant="primary">
              Try again
            </Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}
