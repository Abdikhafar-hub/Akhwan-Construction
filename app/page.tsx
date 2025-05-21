import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, CreditCard, Star, Users, Building2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Building2 className="h-7 w-7" />
              </div>
              <span className="font-bold text-2xl">Akhwan</span>
            </div>
            <span className="text-xs text-muted-foreground pl-2">Powered by A.Khafar Solutions</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/dashboard">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden min-h-[600px] md:min-h-[750px] lg:min-h-[900px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-construction-site.jpg"
            alt="Construction site hero background"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left text-white drop-shadow-lg">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium bg-white/20 backdrop-blur">
                <Star className="h-4 w-4 mr-1" />
                <span>Trusted by 5,000+ builders across Kenya</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Connect with skilled <span className="text-primary">builders</span> across Kenya
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
                Akhwan streamlines construction, repair, and supply services with secure payments and verified
                professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-12 px-6" asChild>
                  <Link href="/signup?role=customer">Find a Builder</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 bg-white text-primary border-primary border hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  asChild
                >
                  <Link href="/signup/select-builder-role">Join as a Builder</Link>
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-white flex items-center justify-center shadow"
                    >
                      <span className="text-xs font-medium text-primary font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-medium">4.9/5 rating</p>
                  <p className="text-white/80">from 1,200+ reviews</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative hidden">
              {/* Image removed, now background */}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-xl font-medium text-muted-foreground">Trusted by leading companies in Kenya</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Safaricom", "Kenya Power", "Equity Bank", "KCB Group", "Britam"].map((company) => (
              <div key={company} className="text-2xl font-bold text-muted-foreground/70">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Choose Akhwan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a secure, transparent way to connect with skilled professionals for all your
              construction needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "Secure Escrow Payments",
                description:
                  "Your money is held safely until the job is completed to your satisfaction, protecting both parties.",
              },
              {
                icon: <CheckCircle className="h-6 w-6 text-primary" />,
                title: "Verified Professionals",
                description: "All builders are vetted and verified, with ratings and reviews from previous customers.",
              },
              {
                icon: <Building2 className="h-6 w-6 text-primary" />,
                title: "Quality Assurance",
                description:
                  "Our platform ensures high standards through a rigorous verification process for all builders.",
              },
              {
                icon: <CreditCard className="h-6 w-6 text-primary" />,
                title: "Flexible Payment Options",
                description: "Pay with M-Pesa, PayPal, or card - whatever works best for you.",
              },
              {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: "Diverse Talent Pool",
                description: "Access to fundis, contractors, professionals, and hardware suppliers all in one place.",
              },
              {
                icon: <Star className="h-6 w-6 text-primary" />,
                title: "Transparent Reviews",
                description: "See honest feedback from previous clients before making your decision.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border hover:shadow-lg transition-shadow group">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our simple 5-step process makes finding and hiring skilled builders easy and secure.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-primary/20"></div>
            <div className="grid md:grid-cols-5 gap-8">
              {[
                {
                  step: 1,
                  title: "Post Request",
                  description: "Describe your job, budget, and timeline",
                  icon: "📝",
                },
                {
                  step: 2,
                  title: "Receive Bids",
                  description: "Compare offers from qualified builders",
                  icon: "🔍",
                },
                {
                  step: 3,
                  title: "Secure Payment",
                  description: "Pay into escrow with M-Pesa, PayPal, or card",
                  icon: "🔒",
                },
                {
                  step: 4,
                  title: "Track Progress",
                  description: "Monitor work with real-time updates",
                  icon: "📊",
                },
                {
                  step: 5,
                  title: "Release Payment",
                  description: "Approve work and release funds",
                  icon: "✅",
                },
              ].map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold mb-6">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="h-12 px-6" asChild>
              <Link href="/wallet">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from customers and builders who have used Akhwan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Homeowner in Nairobi",
                image: "/diverse-group.png",
                quote:
                  "I found a skilled fundi for my kitchen renovation within hours. The escrow payment gave me peace of mind, and the work was completed on time and within budget.",
              },
              {
                name: "Sarah Mwangi",
                role: "Plumbing Fundi in Mombasa",
                image: "/diverse-woman-portrait.png",
                quote:
                  "As a fundi, Akhwan has transformed my business. I get consistent work, and the escrow system ensures I get paid for my services. The platform is easy to use and professional.",
              },
              {
                name: "Michael Ochieng",
                role: "Contractor in Kisumu",
                image: "/thoughtful-man.png",
                quote:
                  "Akhwan has helped me grow my contracting business by connecting me with serious clients. The payment system is reliable and the platform is well-designed.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-8 rounded-xl border relative">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-auto pt-6 border-t">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. Pay only when you use our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-8 rounded-xl border">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">For Customers</h3>
                <div className="text-4xl font-bold mb-2">Free</div>
                <p className="text-muted-foreground">No subscription fees</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Post unlimited job requests</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Access to all verified builders</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Secure escrow payment system</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>5% platform fee on completed jobs</span>
                </div>
              </div>
              <div className="mt-8">
                <Button className="w-full" asChild>
                  <Link href="/signup?role=customer">Sign Up as Customer</Link>
                </Button>
              </div>
            </div>

            <div className="bg-primary text-primary-foreground p-8 rounded-xl border border-primary shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">For Fundis</h3>
                <div className="text-4xl font-bold mb-2">KSh 500</div>
                <p className="text-primary-foreground/80">Monthly subscription</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <span>Bid on unlimited jobs</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <span>Verified badge on profile</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <span>Priority in search results</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                  <span>3% platform fee on completed jobs</span>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/signup?role=fundi">Sign Up as Fundi</Link>
                </Button>
              </div>
            </div>

            <div className="bg-background p-8 rounded-xl border">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">For Contractors</h3>
                <div className="text-4xl font-bold mb-2">KSh 2,000</div>
                <p className="text-muted-foreground">Monthly subscription</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>All Fundi features included</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Team management tools</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced project tracking</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>2% platform fee on completed jobs</span>
                </div>
              </div>
              <div className="mt-8">
                <Button className="w-full" asChild>
                  <Link href="/signup?role=contractor">Sign Up as Contractor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Transform Your Construction Experience?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Join thousands of customers and builders on Kenya's leading construction marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
                <Link href="/signup?role=customer">Find a Builder</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent border-white hover:bg-white/10"
                asChild
              >
                <Link href="/signup?role=builder">Join as a Builder</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <span className="text-xl font-bold">J</span>
                </div>
                <span className="font-bold text-2xl">Akhwan</span>
              </div>
              <p className="text-muted-foreground mb-4">Connecting skilled builders with customers across Kenya.</p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5 text-muted-foreground">{/* Icon would go here */}</div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
                    GedoPay
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/escrow-terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Escrow Terms
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="text-muted-foreground hover:text-foreground transition-colors">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Akhwan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
