import { AppointmentCta } from './appointment-cta';
import { ConnectLinks } from './connect-links';
import { ContactDetails } from './contact-details';
import { ContactForm } from './contact-form';
import { ContactHero } from './contact-hero';
import { GoogleMapSection } from './google-map-section';
import { StudioAddress } from './studio-address';

export function ContactPageContent() {
  return (
    <section className="bg-zinc-100 py-10 md:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1480px] px-4 md:px-8 lg:px-12">
        <ContactHero />

        <div className="mt-10 grid grid-cols-1 gap-7 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-8">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-7">
            <ContactDetails />
            <StudioAddress />
            <ConnectLinks />
            <AppointmentCta />
          </div>
        </div>

        <GoogleMapSection />
      </div>
    </section>
  );
}
