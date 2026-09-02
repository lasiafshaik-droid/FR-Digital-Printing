import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';

const facebookPageUsername = 'FRDigitalPrinting';
const tiktokUsername = 'frdigiprint';

const messengerLink = (text: string) =>
  `https://m.me/${facebookPageUsername}?text=${encodeURIComponent(text)}`;

const services = [
  {
    name: 'Tarpaulin Printings',
    description: 'Fast and durable tarpaulin prints for events, business promos, announcements, and signage.',
    icon: '/icon/tarp.png'
  },
  {
    name: 'Flyer Printing',
    description: 'Fast, affordable, and quality flyer prints for business promos, events, and announcements.',
    icon: '/icon/flyers.png'
  },
  {
    name: 'Souvenirs',
    description: 'Simple and affordable souvenir printing for giveaways and special occasions.',
    icon: '/icon/souvenir.png'
  },
  {
    name: 'Invitation Printing',
    description: 'Clean and elegant invitation layouts for weddings, debuts, birthdays, and more.',
    icon: '/icon/invitation.png'
  },
  {
    name: 'Sticker Printing',
    description: 'Vibrant stickers for branding, product labels, packaging, and giveaways.',
    icon: '/icon/sticker.png'
  },
  {
    name: 'Calling Cards / Loyalty Cards',
    description: 'Professional calling cards and loyalty cards for your shop or service business.',
    icon: '/icon/callingcard.png'
  },
  {
    name: 'Laminate & Documents Printing',
    description: 'Fast and reliable laminating, photocopying, and document printing services for school, office, business, and personal needs.',
    icon: '/icon/laminate.png'
  },
  {
    name: 'Sintra Board',
    description: 'High-quality Sintra board printing for business signage, promotional displays, menu boards, event signage, and indoor advertising.',
    icon: '/icon/sintra.png'
  },
  {
    name: 'Photo Print / Vaccine Cards',
    description: 'Sharp and vibrant photo printing for IDs, passports, personal photos, and vaccine cards.',
    icon: '/icon/photoprint.png'
  },
  {
  name: 'Printing Supplies',
  description: 'We also offer photo paper, sticker paper, tarpaulin materials, ink, and other printing supplies.',
  icon: '/icon/supplies.png',
  isSupplies: true
}
];

const sampleCategories = [
  {
    category: 'Flyers / Brochures',
    items: [
      { src: '/images/flyers.jpg', label: 'Business Flyer' },
      { src: '/images/brochure.jpg', label: 'Business Flyer' }
    ]
  },
  {
    category: 'Tarpaulin',
    items: [
      { src: '/images/tarp1.jpg', label: 'Event Tarpaulin Banner' },
      { src: '/images/tarp2.jpg', label: 'Event Tarpaulin Banner' }
    ]
  },
  {
    category: 'Banners',
    items: [
      { src: '/images/pull-up.jpg', label: 'Event Pull-Up Banner' },
      { src: '/images/banner2.jpg', label: 'Event Pull-Up Banner' }
    ]
  },
  {
    category: 'Invitations',
    items: [
      { src: '/images/invitation.jpg', label: 'Wedding Invitation' },
      { src: '/images/invitation-sample.jpg', label: 'Wedding Invitation' }
    ]
  },
  {
    category: 'Stickers',
    items: [
      { src: '/images/sticker.jpg', label: 'Custom Stickers' },
      { src: '/images/sticker-sample.jpg', label: 'Custom Stickers' }
    ]
  },
  {
    category: 'Calling Cards',
    items: [
      { src: '/images/sample.jpg', label: 'Business Calling Cards' },
      { src: '/images/callingcard2.jpg', label: 'Loyalty Cards' }
    ]
  },
  {
    category: 'Souvenirs',
    items: [
      { src: '/images/souvenir.jpg', label: 'Custom Souvenirs' },
      { src: '/images/souvenir2.jpg', label: 'Custom Souvenirs' }
    ]
  },
  {
    category: 'Photo Print / Vaccine Card',
    items: [
      { src: '/images/photo1.jpg', label: 'Custom Souvenirs' },
      { src: '/images/photo2.jpg', label: 'Custom Souvenirs' }
    ]
  },
  {
    category: 'Sticker on Sintra Board',
    items: [
      { src: '/images/sintra1.jpg', label: 'Custom Souvenirs' },
      { src: '/images/sintra2.jpg', label: 'Custom Souvenirs' }
    ]
  }
];

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Send us a message on Facebook Messenger or fill out the inquiry form with your name, contact number, and order details.'
  },
  {
    q: 'Can you help me with the design?',
    a: 'Yes. You can send your own layout, or ask us for help with a simple design brief.'
  },
  {
    q: 'Do you accept rush orders?',
    a: 'Rush printing may be available depending on the item and current queue. Message us for availability.'
  },
  {
    q: 'What details should I send?',
    a: 'Please include the service you need, quantity, size, preferred finish, and your deadline if you have one.'
  }
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    orderDetails: ''
  });
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showMessenger, setShowMessenger] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/about') {
        setCurrentView('about');
        window.scrollTo({ top: 0 });
      } else {
        setCurrentView('home');
      }
    };

    // Check hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
useEffect(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    setShowMessenger(scrollTop > 800);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll(); // important so it checks on load

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prefilledMessage = [
      'Hi, I want to inquire about printing services.',
      `Name: ${formData.name}`,
      `Contact: ${formData.contact}`,
      `Order details: ${formData.orderDetails}`
    ].join('\n');

    const link = messengerLink(prefilledMessage);
    window.open(link, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', contact: '', orderDetails: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }));
  };

  const toggleService = (serviceName: string) => {
  setSelectedServices((current) =>
    current.includes(serviceName)
      ? current.filter((name) => name !== serviceName)
      : [...current, serviceName]
  );
};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
  href="#/"
  onClick={(e) => {
    e.preventDefault();
    setCurrentView('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className="flex items-center gap-3 cursor-pointer"
>
  <img
    src="/images/logo.jpg"
    alt="FR Digital Printing Logo"
    className="h-10 w-auto"
  />

  <div className="flex flex-col leading-tight">
    <span className="text-lg font-black text-indigo-600 sm:text-xl">
      FR Digital Printing
    </span>
    <span className="text-xs text-slate-500">
      Services and Supplies
    </span>
  </div>
</a>
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#/about"
              className={`text-sm font-medium transition hover:text-indigo-600 ${currentView === 'about' ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}
            >
              About Us
            </a>
            <button
              onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Services
            </button>
            <button
              onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Samples
            </button>
            <button
              onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-2">
         <a
  href={`https://www.facebook.com/${facebookPageUsername}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook Page"
  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className="h-5 w-5 fill-current"
  >
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
  </svg>
</a>
<a
  href={`https://www.tiktok.com/@${tiktokUsername}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="TikTok Page"
  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-slate-800"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="h-5 w-5 fill-current"
  >
    <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7c0 91.1-73.9 165-165 165S-4.8 440.5-4.8 349.4s73.9-165 165-165c13.6 0 26.7 1.7 39.1 4.9v83.6c-12.1-4.1-25-6.3-38.4-6.3-46.1 0-83.5 37.4-83.5 83.5s37.4 83.5 83.5 83.5 83.5-37.4 83.5-83.5V0h83.7c6.7 50.3 46.4 89.8 96.8 96.1v113.8z"/>
  </svg>
</a>
</div>
        </div>
      </nav>

      <main className="pt-16">
        {currentView === 'about' ? (
          <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 animate-fadeIn">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">About Us</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                  Your Trusted Partner for Quality Digital Prints & Supplies
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-8">
                  At FR Digital Printing Services and Supplies, every project is handled with care and attention to detail to ensure customer satisfaction. Let us help bring your ideas to life through quality printing that makes a lasting impression.
                </p>
                <p className="mt-4 text-base text-slate-600 leading-7">
                  Quality Prints. Affordable Prices. Reliable Service.
                </p>
                <div className="mt-8">
                  <a
                    href="#/"
                    className="inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Back to Homepage
                  </a>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="font-semibold text-slate-900">Fast Turnaround</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-6">We value your time. Get your orders prepped, printed, and packaged on schedule.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-semibold text-slate-900">Budget Friendly</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-6">Affordable tiers and customized quotes tailored precisely to your specific order volume.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-3xl mb-2">✨</div>
                  <h3 className="font-semibold text-slate-900">Premium Output</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-6">Vibrant color replication, sharp typography, and high-grade materials every single time.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="font-semibold text-slate-900">Smooth Ordering</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-6">No endless forms. Input your core details and instantly shift to Messenger for rapid checkouts.</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section
              id="home"
              className="relative isolate overflow-hidden"
              style={{
                backgroundImage: "url('/images/background2.jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />
              <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-3xl pb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                    YOUR TRUSTED HOME-BASED PRINTING PARTNER
                  </p>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    FR Digital Printing Services and Supplies
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
                    Welcome to FR Digital Printing Services and Supplies, your trusted home-based printing partner for high-quality and affordable printing solutions.
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-sm">
                    We specialize in producing vibrant and professional prints, including flyers, calling cards, tarpaulins, loyalty cards, stickers, and Sintra board signage. Whether you're promoting your business, advertising an event, or creating custom marketing materials, we are committed to delivering excellent print quality, fast turnaround times, and reliable service.
                  </p>
                  <p className="mt-8 text-sm text-white/70">
                    Request a free quotation today. Click Get a Quote and send us your project details via Messenger.
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Affordable printing services for everyday business needs
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Clear pricing, quick responses, and quality output for small businesses, events, schools, and offices.
            </p>
            <div className="mt-6">
  <button
    onClick={() => setShowQuoteModal(true)}
    className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
  >
    Get a Quote
  </button>
</div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50">
  <img
    src={service.icon}
    alt={service.name}
    className="h-15 w-15 object-contain"
  />
</div>
                <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                {service.isSupplies && (
  <button
    onClick={() =>
      window.open(
        messengerLink('Hi, I want to ask about your available printing supplies.'),
        '_blank'
      )
    }
    className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
  >
    Ask about supplies
  </button>
)}
              </div>
            ))}
          </div>
        </section>

        <section id="samples" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Samples</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Our Sample Designs</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Explore our sample designs and get ideas for your next project. We can customize designs to fit your brand, event, or personal style.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleCategories.map((group) => (
                <div key={group.category} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={group.items[0].src}
                      alt={group.category}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{group.category}</h3>
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
  {group.items.length} sample{group.items.length > 1 ? 's' : ''}
</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveGallery(group.category)}
                      className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      View Samples
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Modal */}
        {activeGallery && (() => {
          const group = sampleCategories.find((g) => g.category === activeGallery);
          if (!group) return null;
          return (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setActiveGallery(null)}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{group.category}</h3>
                    <p className="text-sm text-slate-500">{group.items.length} sample{group.items.length > 1 ? 's' : ''}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveGallery(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {group.items.map((item) => (
  <figure
    key={item.label}
    onClick={() => setPreviewImage(item.src)}
    className="cursor-pointer overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200"
  >
    <img
      src={item.src}
      alt={item.label}
      className="h-full w-full object-cover"
    />
    <figcaption className="px-4 py-3 text-sm font-medium text-slate-700">
      {item.label}
    </figcaption>
  </figure>
))}
                </div>
              </div>
            </div>
          );
        })()}
        {showQuoteModal && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
    onClick={() => setShowQuoteModal(false)}
  >
    <div
      className="w-full max-w-sm rounded-2xl bg-white p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
  <img
    src="/images/logo.jpg"
    alt="FR Digital Printing"
    className="h-8 w-8 rounded-full"
  />
  Select a Service
</h3>

        <button
          onClick={() => setShowQuoteModal(false)}
          className="text-slate-500"
        >
          ✕
        </button>
      </div>

      <p className="mb-3 text-sm text-slate-500">
  Select one or more services.
</p>

<div className="space-y-1.5 max-h-[60vh] overflow-y-auto">

{services
.filter((service) => !service.isSupplies)
.map((service) => (

<label
key={service.name}
className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
>

<input
type="checkbox"
checked={selectedServices.includes(service.name)}
onChange={() => toggleService(service.name)}
className="h-4 w-4 accent-indigo-600"
/>

<div className="flex items-center gap-3">
  <img
    src={service.icon}
    alt={service.name}
    className="h-8 w-8 object-contain flex-shrink-0"
  />
  <span>{service.name}</span>
</div>

</label>

))}

</div>


<button
disabled={selectedServices.length === 0}
onClick={() => {

const message = [
"Hi! I would like a quotation for:",
"",
...selectedServices.map((service) => `• ${service}`),
"",
"Quantity:",
"Size:",
"Details:"
].join("\n");


window.open(
messengerLink(message),
"_blank",
"noopener,noreferrer"
);


setSelectedServices([]);
setShowQuoteModal(false);

}}

className="mt-4 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:bg-slate-300"
>

Continue to Messenger

</button>
    </div>
  </div>
)}

        <section id="contact" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Send us a message for more details</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Share your printing needs and we will help you with pricing, layout, and the best option for your order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="contact" className="mb-2 block text-sm font-medium text-slate-700">
                Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                type="tel"
                required
                value={formData.contact}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="09XX XXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="orderDetails" className="mb-2 block text-sm font-medium text-slate-700">
                Order Details
              </label>
              <textarea
                id="orderDetails"
                name="orderDetails"
                required
                value={formData.orderDetails}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder={'Service needed, quantity, size, finish, and deadline.\nExample: Flyer printing, 500 pcs, A5 size, glossy finish.'}
              />
            </div>

              <button
                type="submit"
                className="w-full rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700"
              >
                Get a Quote via Messenger
              </button>

            <div className="text-center">
              <p className="text-sm text-slate-600">
                After you submit, Messenger will open with your inquiry already filled in.
              </p>
            </div>
          </form>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        </>
        )}
      </main>

      <footer className="bg-slate-950 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold">FR Digital Printing Services and Supplies</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Fast, affordable, and quality printing for businesses, events, and everyday needs.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li><a href="#/" className="transition hover:text-white">Home</a></li>
                <li><a href="#/about" className="transition hover:text-white">About Us</a></li>
                <li>
                  <button
                    onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                    className="transition hover:text-white text-left text-sm"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('samples')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                    className="transition hover:text-white text-left text-sm"
                  >
                    Samples
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setCurrentView('home'); window.location.hash = '#/'; setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                    className="transition hover:text-white text-left text-sm"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>📱 Mobile: 09095485229 / 09627308219</li>
                <li>📍 Location: Camarin Caloocan City, Caloocan, Philippines, 1400</li>
                <li className="pt-2 flex gap-2">
                  <a
  href={`https://www.facebook.com/${facebookPageUsername}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook Page"
  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className="h-5 w-5 fill-current"
  >
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
  </svg>
</a>
<a
  href={`https://www.tiktok.com/@${tiktokUsername}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="TikTok Page"
  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-slate-800"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="h-5 w-5 fill-current"
  >
    <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7c0 91.1-73.9 165-165 165S-4.8 440.5-4.8 349.4s73.9-165 165-165c13.6 0 26.7 1.7 39.1 4.9v83.6c-12.1-4.1-25-6.3-38.4-6.3-46.1 0-83.5 37.4-83.5 83.5s37.4 83.5 83.5 83.5 83.5-37.4 83.5-83.5V0h83.7c6.7 50.3 46.4 89.8 96.8 96.1v113.8z"/>
  </svg>
</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 FR Digital Printing Services and Supplies. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showMessenger && (
  <a
    href={messengerLink("Hi! I have a question about your printing services.")}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg transition hover:scale-110"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 2C6.4 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.8 7.2V22l3.5-1.9c.9.3 1.8.4 2.7.4 5.6 0 10-4.1 10-9.3C22 6.1 17.6 2 12 2zm1.1 12.5l-2.8-3-5.2 3 5.7-6.1 2.8 3 5.1-3-5.6 6.1z"/>
    </svg>
  </a>
)}
      {previewImage && (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
    onClick={() => setPreviewImage(null)}
  >
     <button
      onClick={() => setPreviewImage(null)}
      className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-black"
    >
      ✕
    </button>
    <img
      src={previewImage}
      alt="Preview"
      className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
    />
  </div>
)}
    </div>
  );
}

export default App;
