import { Button } from "../components/UI/button"
import { Card, CardContent } from "../components/UI/card"
import { ArrowRight, Target, Users, Zap, Globe, Heart, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header - Same as landing page */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white font-bold ml-3">
               <img
                  src="/logo.png"
                  alt="PharmaChain Logo"
                  className="h-8 w-8 rounded-full bg-teal-600 object-cover"
                />
            </div>
            <span className="text-xl font-bold text-teal-600">PharmaChain</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Home
            </a>
            <a href="/about" className="text-sm font-medium text-teal-600">
              About
            </a>
            
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 mr-5" asChild>
              <a href="/signup">Sign Up</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50 py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                The <span className="text-teal-600">PharmaChain</span> Story
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Bridging the Pharma Supply Chain</p>
              <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto text-center mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In India's pharmaceutical ecosystem, manufacturers, distributors, and retailers operate with immense
                  potential — but in isolation. There's no single platform that truly connects them, and in a world
                  moving rapidly towards AI-driven convenience and real-time commerce, this gap can no longer be
                  ignored.
                </p>
                <p className="text-2xl font-semibold text-teal-600 mt-8">That's where PharmaChain comes in.</p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-6">
                  We're building a digital ecosystem designed to unify the entire pharma supply chain — enabling
                  seamless communication, smarter trading, and total transparency across all levels of the industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold ml-10 mb-6">The Challenge We're Solving</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-10"></div>
                    <p className="text-muted-foreground ">Fragmented communication between supply chain stakeholders</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-10"></div>
                    <p className="text-muted-foreground">Inefficient trading processes and outdated systems</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-10"></div>
                    <p className="text-muted-foreground">Lack of transparency across the pharmaceutical supply chain</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-10"></div>
                    <p className="text-muted-foreground">Missed opportunities for growth and collaboration</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Unified digital platform connecting all stakeholders</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">AI-driven convenience and real-time commerce capabilities</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Complete transparency and traceability throughout the supply chain
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Empowering every trader to earn more and achieve more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">About the Founder</h2>
                <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Anshika Pandey</h3>
                      <p className="text-teal-600 font-semibold mb-4">Founder & Visionary</p>
                      <p className="text-muted-foreground leading-relaxed">
                        At just 22 years old, Anshika Pandey is a pharmacy professional turned entrepreneur who
                        recognized a growing disconnect in one of the most crucial industries — medicine. In an age
                        where everything is becoming connected, pharma trade remained scattered, inefficient, and
                        outdated.
                      </p>
                    </div>

                    <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-600">
                      <p className="italic text-muted-foreground">
                        "Driven by the belief that the pharma industry deserves smarter solutions, I set out to build a
                        platform that empowers every trader — to earn more, achieve more, and connect effortlessly."
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Award className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                          <p className="font-semibold">Pharmacy Professional</p>
                          <p className="text-sm text-muted-foreground">Industry Expert</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Target className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                          <p className="font-semibold">Visionary Leader</p>
                          <p className="text-sm text-muted-foreground">22 Years Old</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 p-8 flex items-center justify-center">
                      <div className="w-full h-full rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">AP</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Anshika Pandey</p>
                          <p className="text-xs text-muted-foreground">Founder, PharmaChain</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                More Than Just an App
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                PharmaChain is more than just an app. It's a mission.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="border-2 border-teal-100 hover:border-teal-200 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To bridge the pharmaceutical supply chain and create a unified digital ecosystem for all
                      stakeholders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-100 hover:border-teal-200 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To transform India's pharmaceutical industry through technology, transparency, and seamless
                      connectivity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-teal-100 hover:border-teal-200 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Our Impact</h3>
                    <p className="text-muted-foreground">
                      Empowering every trader to earn more, achieve more, and connect effortlessly in the digital age.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-teal-600 text-white rounded-2xl p-12">
                <h3 className="text-3xl font-bold mb-4">Bridging the Pharma Supply Chain</h3>
                <p className="text-xl text-teal-100 mb-8">And the journey is just beginning.</p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="/signup">
                    Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our Core Values</h2>
                <p className="text-muted-foreground">The principles that guide everything we do at PharmaChain</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connection</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of bringing people together and creating meaningful relationships across
                      the pharmaceutical supply chain.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">
                      We're committed to leveraging cutting-edge technology to solve age-old problems in the
                      pharmaceutical industry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Integrity</h3>
                    <p className="text-muted-foreground">
                      Transparency and trust are at the core of everything we do, ensuring safe and reliable
                      pharmaceutical trading.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-teal-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Empowerment</h3>
                    <p className="text-muted-foreground">
                      We're dedicated to empowering every stakeholder in the supply chain to achieve their full
                      potential and grow their business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-teal-600 text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Be Part of the Revolution?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Join thousands of pharmaceutical professionals who are already transforming their business with
                PharmaChain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="/signup">Start Your Journey</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as landing page */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
                  P
                </div>
                <span className="text-xl font-bold text-white">PharmaChain</span>
              </div>
              <p className="text-slate-400 mb-4">
                Bridging the pharmaceutical supply chain with innovative digital solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
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
                  <a href="mailto:support@pharmachain.com" className="text-slate-400 hover:text-white transition-colors">
                    support@pharmachain.com
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
