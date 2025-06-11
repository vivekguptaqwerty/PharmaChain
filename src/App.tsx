import { ArrowRight, CheckCircle, Shield, TruckIcon, Users } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"
import medicine from "./assets/medicine.jpg"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col mx-auto max-w-[1600px]">
      {/* Wrap header and main in a div with padding */}
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="layout-container">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="PharmaChain Logo"
                  className="h-8 w-8 rounded-full bg-teal-600 object-cover"
                />
                <RouterLink to="/">
                  <span className="text-xl font-bold text-teal-600">PharmaChain</span>
                </RouterLink>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <ScrollLink
                  to="how-it-works"
                  smooth={true}
                  duration={500}
                  className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer"
                >
                  How It Works
                </ScrollLink>
                <ScrollLink
                  to="user-types"
                  smooth={true}
                  duration={500}
                  className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer"
                >
                  User Types
                </ScrollLink>
                <ScrollLink
                  to="features"
                  smooth={true}
                  duration={500}
                  className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Features
                </ScrollLink>
                <RouterLink
                  to="/about"
                  className="text-sm font-medium hover:text-teal-600 transition-colors"
                >
                  About
                </RouterLink>
              </nav>
              <div className="flex items-center gap-2">
                <RouterLink to="/login">
                  <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Login
                  </button>
                </RouterLink>
                <RouterLink to="/signup">
                  <button className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 cursor-pointer">
                    Sign Up
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50 py-20 md:py-32">
            <div className="layout-container flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Connecting Pharma, <span className="text-teal-600">Seamlessly</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                The trusted B2B platform streamlining pharmaceutical supply chains with secure, efficient, and transparent
                solutions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <RouterLink to="/signup">
                    <button className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-3 text-base font-medium text-white hover:bg-teal-700 cursor-pointer">
                    Sign Up Free
                    </button>
                </RouterLink>
              </div>
              <div className="mt-16 w-full max-w-5xl rounded-lg border bg-white/50 shadow-lg backdrop-blur-sm">
                <img
                  src={medicine}
                  alt="PharmaChain Platform Dashboard"
                  className="w-full rounded-lg"
                  width={1200}
                  height={600}
                />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 bg-white">
            <div className="layout-container">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How PharmaChain Works</h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground">
                  Our streamlined process connects pharmaceutical businesses efficiently in four simple steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Register & Verify",
                    description:
                      "Create your account and complete our thorough verification process to ensure platform integrity.",
                  },
                  {
                    step: "2",
                    title: "Connect & Discover",
                    description:
                      "Browse verified manufacturers, wholesalers, distributors, and retailers to find the right partners.",
                  },
                  {
                    step: "3",
                    title: "Order & Track",
                    description: "Place orders securely through our platform with real-time tracking and notifications.",
                  },
                  {
                    step: "4",
                    title: "Deliver & Review",
                    description: "Receive your shipment and provide feedback to maintain our quality standards.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* User Types Section */}
          <section id="user-types" className="py-20 bg-slate-50">
            <div className="layout-container">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who Uses PharmaChain</h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground">
                  Our platform serves the entire pharmaceutical supply chain with tailored solutions for each stakeholder.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Users className="h-10 w-10 text-teal-600" />,
                    title: "Manufacturers",
                    description:
                      "Connect directly with distributors and retailers, streamline your supply chain, and gain market insights.",
                  },
                  {
                    icon: <TruckIcon className="h-10 w-10 text-teal-600" />,
                    title: "Wholesalers",
                    description:
                      "Source products from verified manufacturers and supply to distributors with complete transparency.",
                  },
                  {
                    icon: <ArrowRight className="h-10 w-10 text-teal-600" />,
                    title: "Distributors",
                    description:
                      "Optimize your distribution network with real-time inventory management and logistics support.",
                  },
                  {
                    icon: <CheckCircle className="h-10 w-10 text-teal-600" />,
                    title: "Retailers",
                    description:
                      "Access a wide range of pharmaceutical products from verified suppliers at competitive prices.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white">
            <div className="layout-container">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Platform Features</h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground">
                  PharmaChain offers powerful tools designed specifically for the pharmaceutical industry.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col p-6 rounded-lg border bg-white shadow-sm">
                  <TruckIcon className="h-10 w-10 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Real-time Order Tracking</h3>
                  <p className="text-muted-foreground mb-4">
                    Monitor your shipments from warehouse to delivery with GPS tracking and status updates.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">GPS-enabled tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Automated notifications</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Delivery confirmation</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 rounded-lg border bg-white shadow-sm">
                  <Shield className="h-10 w-10 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Secure Payment System</h3>
                  <p className="text-muted-foreground mb-4">
                    Process transactions securely with our escrow system and multiple payment options.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Escrow protection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Multiple payment methods</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Fraud prevention</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 rounded-lg border bg-white shadow-sm">
                  <Users className="h-10 w-10 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Verified Seller Network</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with thoroughly vetted pharmaceutical businesses to ensure quality and compliance.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Rigorous verification process</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Compliance documentation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-teal-600 mr-2" />
                      <span className="text-sm">Rating and review system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-teal-600 text-white">
            <div className="layout-container">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Pharmaceutical Supply Chain?
                </h2>
                <p className="mt-4 max-w-[700px] text-teal-50">
                  Join thousands of pharmaceutical businesses already using PharmaChain to streamline their operations.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <RouterLink to="/signup">
                    <button className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-teal-600 hover:bg-gray-100">
                      Get Started Today
                    </button>
                  </RouterLink>
                  <RouterLink to="/contact">
                    <button className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-base font-medium text-white hover:bg-teal-700">
                      Contact Sales
                    </button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="layout-container">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Industry Leaders
                </h2>
                <p className="mt-4 max-w-[700px] text-muted-foreground">
                  See what our customers have to say about their experience with PharmaChain.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote:
                      "PharmaChain has revolutionized how we manage our supply chain. The verification process gives us confidence in every transaction.",
                    name: "Sarah Johnson",
                    title: "Supply Chain Director, MediPharm Inc.",
                  },
                  {
                    quote:
                      "The real-time tracking feature has reduced our delivery issues by 85%. Our customers are happier, and our operations are smoother.",
                    name: "David Chen",
                    title: "Operations Manager, Global Pharma Distributors",
                  },
                  {
                    quote:
                      "As a retailer, finding reliable suppliers was always challenging. PharmaChain has simplified this process and improved our inventory management.",
                    name: "Maria Rodriguez",
                    title: "Pharmacy Owner, HealthFirst Pharmacy",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col p-6 rounded-lg border bg-slate-50 shadow-sm">
                    <p className="italic text-muted-foreground mb-6">"{item.quote}"</p>
                    <div className="mt-auto">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer - Outside the padding wrapper */}
      <footer id="about" className="bg-slate-900 text-slate-200 py-12">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
                  P
                </div>
                <RouterLink to="/">
                  <span className="text-xl font-bold text-white">PharmaChain</span>
                </RouterLink>
              </div>
              <p className="text-slate-400 mb-4">
                Connecting the pharmaceutical industry with secure, efficient, and transparent supply chain solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-slate-400">Mumbai, India</li>
                <li>
                  <a href="mailto:support@PharmaChain.com" className="text-slate-400 hover:text-white transition-colors">
                    support@PharmaChain.com
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} PharmaChain. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}