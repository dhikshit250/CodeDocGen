import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Code & Doc Generator',
  description: 'Terms of service for Code & Doc Generator',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using Code & Doc Generator, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on 
                Code & Doc Generator for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and 
                password. You agree to accept responsibility for all activities that occur 
                under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Generated Content</h2>
              <p>
                You retain ownership of content you generate using our service. However, we 
                are not responsible for the accuracy, legality, or appropriateness of 
                generated content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Prohibited Uses</h2>
              <p>
                You may not use our service for any illegal or unauthorized purpose. You must 
                not use our service to generate harmful, offensive, or malicious content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Service Availability</h2>
              <p>
                We strive to maintain high service availability but do not guarantee 
                uninterrupted access. We may update, modify, or discontinue the service 
                at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
              <p>
                In no event shall Code & Doc Generator or its suppliers be liable for any 
                damages arising out of the use or inability to use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact Information</h2>
              <p>
                Questions about the Terms of Service should be sent to 
                legal@codedocgen.com
              </p>
            </section>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
