import { Footer } from "@components/landing/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Felinify",
  description:
    "Privacy Policy for Felinify.com - Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="px-4 max-w-[1200px] mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: August 27, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-foreground">
              <div className="bg-card border border-border rounded-lg p-8">
                <p className="text-muted-foreground mb-6">
                  At Felinify.com ("we," "our," "us"), your privacy is important
                  to us. This Privacy Policy explains how we collect, use, and
                  protect your personal information when you use our website,
                  mobile applications, and services (collectively, the
                  "Service"). By using Felinify, you agree to the terms outlined
                  in this policy.
                </p>

                <div className="space-y-6">
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      1. Information We Collect
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          a. Personal Information
                        </h3>
                        <p className="text-foreground leading-relaxed mb-3">
                          When you register an account or use certain features,
                          we may collect:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                          <li>Email address</li>
                          <li>
                            Payment information (processed securely by Stripe)
                          </li>
                          <li>
                            User-generated content (e.g., notes, flashcards)
                          </li>
                          <li>Usage data (e.g., study habits, progress)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          b. Automatically Collected Information
                        </h3>
                        <p className="text-foreground leading-relaxed mb-3">
                          We may collect technical data such as:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                          <li>IP address</li>
                          <li>Browser type and version</li>
                          <li>Device information</li>
                          <li>Log data (e.g., pages visited, timestamps)</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      2. How We Use Your Information
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                      <li>Provide, operate, and improve the Service</li>
                      <li>
                        Personalize your study experience with AI-powered
                        flashcards
                      </li>
                      <li>Process payments securely through Stripe</li>
                      <li>
                        Communicate important updates and respond to inquiries
                      </li>
                      <li>
                        Monitor and analyze usage to enhance performance and
                        security
                      </li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      3. Data Sharing and Third-Party Services
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      We do not sell your personal data. However, we may share
                      your information with trusted third parties to operate the
                      Service, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                      <li>
                        Stripe: For payment processing and billing management.
                      </li>
                      <li>
                        OpenAI: To provide AI-powered flashcard generation and
                        study modes.
                      </li>
                      <li>
                        Other service providers who help us maintain and improve
                        the Service.
                      </li>
                    </ul>
                    <p className="text-foreground leading-relaxed mt-4">
                      These third parties are bound by confidentiality
                      agreements and are only authorized to use your information
                      to provide services to us.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      4. Data Security
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      We take reasonable measures to protect your personal data
                      from unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission over the
                      internet or electronic storage is completely secure, and
                      we cannot guarantee absolute security.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      5. Your Choices
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                      <li>
                        <strong>Account Information:</strong> You can update or
                        delete your account information at any time through your
                        account settings.
                      </li>
                      <li>
                        <strong>Communication Preferences:</strong> You can
                        opt-out of promotional emails by following the
                        unsubscribe instructions in those emails.
                      </li>
                      <li>
                        <strong>Cookies:</strong> We use cookies and similar
                        technologies to improve user experience. You can manage
                        cookie preferences in your browser settings.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      6. Children's Privacy
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      Felinify is designed for users of all ages. If you are
                      under 18, you must have parental or guardian consent to
                      use the Service. We do not knowingly collect personal
                      information from children without such consent. If you
                      believe we have collected data from a child without
                      consent, please contact us to request deletion.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      7. About the Service Provider
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      Felinify.com is operated by its founder who is currently
                      under 18 years of age. By using this Service, you
                      acknowledge that the Service is provided by a minor and
                      understand the limitations and responsibilities involved.
                    </p>
                    <p className="text-foreground leading-relaxed">
                      While every effort is made to protect your data, the
                      founder may not have a formal business entity or tax
                      registration at this time. Users agree to hold the Service
                      and its founder harmless from any liabilities arising from
                      this status.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      8. International Users
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      If you are accessing Felinify from outside the United
                      States, please be aware that your information may be
                      transferred to, stored, and processed in the United States
                      where our servers are located. By using the Service, you
                      consent to this transfer.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      9. Changes to This Privacy Policy
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time. We
                      will notify you of significant changes by posting the new
                      policy on our website or via email. Your continued use of
                      the Service after changes constitutes acceptance.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      10. Contact Us
                    </h2>
                    <p className="text-foreground leading-relaxed">
                      If you have any questions or concerns about this Privacy
                      Policy or how your data is handled, please contact us at:{" "}
                      <a
                        href="mailto:contact@felinify.com"
                        className="text-primary hover:underline"
                      >
                        contact@felinify.com
                      </a>
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
    </>
  );
}
