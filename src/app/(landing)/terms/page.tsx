import { LandingNavbar } from "@components/landing-navbar";
import { Footer } from "@components/landing/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Felinify",
  description:
    "Terms of Service for Felinify.com - AI-powered flashcard application for focused, fast learning.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="overflow-x-hidden">
      <LandingNavbar />

      <main className="px-4 max-w-[1200px] mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: August 27, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-foreground">
              <div className="bg-card border border-border rounded-lg p-8">
                <p className="text-muted-foreground mb-6">
                  Welcome to Felinify.com ("we," "our," "us"). These Terms of
                  Service ("Terms") govern your use of our website, mobile
                  applications, and services (collectively, the "Service"). By
                  accessing or using Felinify, you agree to these Terms. If you
                  do not agree, please do not use our Service.
                </p>

                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      1. Account Registration and Security
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      To use certain features, you may be required to register
                      an account and provide accurate, current, and complete
                      information. You are responsible for safeguarding your
                      account credentials and for all activities under your
                      account.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      2. Description of Service
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      Felinify is an AI-powered flashcard application designed
                      to help users study efficiently by generating and adapting
                      flashcards based on user input and learning performance.
                      The AI functionalities rely on third-party APIs such as
                      OpenAI's GPT.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      3. User Content
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      You retain ownership of any content you upload or create
                      through the Service ("User Content"). By submitting User
                      Content, you grant us a worldwide, non-exclusive,
                      royalty-free license to use, reproduce, modify, adapt,
                      publish, and distribute such content solely to provide and
                      improve the Service.
                    </p>
                    <p className="text-foreground leading-relaxed mb-4">
                      You agree not to submit User Content that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                      <li>
                        Violates copyrights, trademarks, or other intellectual
                        property rights.
                      </li>
                      <li>
                        Is unlawful, harmful, fraudulent, defamatory, obscene,
                        or otherwise objectionable.
                      </li>
                      <li>
                        Contains viruses, malware, or other harmful components.
                      </li>
                    </ul>
                    <p className="text-foreground leading-relaxed mt-4">
                      We reserve the right to remove or disable access to User
                      Content that violates these Terms or is reported by
                      others.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      4. Prohibited Uses
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      You agree not to use the Service to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                      <li>Violate any applicable laws or regulations.</li>
                      <li>
                        Infringe on third-party rights or intellectual property.
                      </li>
                      <li>
                        Upload, post, or distribute content that is illegal,
                        defamatory, harmful, or offensive.
                      </li>
                      <li>
                        Attempt to gain unauthorized access to our systems or
                        interfere with others' use of the Service.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      5. Payments and Refunds
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      Felinify offers paid features or subscriptions. All
                      payments are processed securely through Stripe. You agree
                      to pay all fees and applicable taxes. Refunds are granted
                      at our sole discretion and subject to our refund policy.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      6. Intellectual Property Rights
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      All intellectual property rights in the Service (excluding
                      User Content and third-party content) are owned by or
                      licensed to us. This includes software, designs, text,
                      graphics, logos, trademarks, and technology. You agree not
                      to copy, reproduce, distribute, create derivative works
                      of, or otherwise exploit our Service without express
                      permission.
                    </p>
                    <p className="text-foreground leading-relaxed">
                      Third-party services such as OpenAI's GPT are used under
                      license and remain the property of their respective
                      owners.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      7. Disclaimers and Limitation of Liability
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      The Service is provided "as is" and "as available,"
                      without warranties of any kind, express or implied. We do
                      not guarantee the accuracy, reliability, or completeness
                      of the Service or User Content. You use the Service at
                      your own risk.
                    </p>
                    <p className="text-foreground leading-relaxed">
                      To the maximum extent permitted by law, we shall not be
                      liable for any indirect, incidental, special,
                      consequential, or punitive damages arising from your use
                      of the Service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      8. Indemnification
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      You agree to indemnify and hold harmless Felinify and its
                      affiliates, officers, directors, employees, and agents
                      from any claims, liabilities, damages, or expenses arising
                      from your violation of these Terms or your misuse of the
                      Service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      9. Termination
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      We reserve the right to suspend or terminate your access
                      to the Service at any time, without notice, for violations
                      of these Terms or for any reason.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      10. Governing Law and Dispute Resolution
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      These Terms are governed by the laws of the United States.
                      Any disputes arising from these Terms or the Service shall
                      be resolved in the courts located within the United
                      States.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      11. Changes to Terms
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      We may modify these Terms at any time. We will notify you
                      of significant changes by posting the new Terms on our
                      website or via email. Continued use of the Service after
                      changes constitutes acceptance.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      12. Contact Us
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      For questions regarding these Terms, contact us at{" "}
                      <a
                        href="mailto:contact@felinify.com"
                        className="text-primary hover:underline"
                      >
                        contact@felinify.com
                      </a>
                      .
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="px-4 max-w-[1200px] mx-auto">
        <Footer />
      </div>
    </div>
  );
}
