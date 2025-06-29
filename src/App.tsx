import React, { useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { easeOut } from "framer-motion/dom";
import {
  Building2,
  Truck,
  Store,
  Package,
  Shield,
  CreditCard,
  MapPin,
  CheckCircle,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MapPinIcon,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

// Button Component
interface ButtonProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  asChild = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all";
  const variantStyles = {
    default: "bg-teal-600 text-white hover:bg-teal-700",
    ghost: "bg-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-teal-300",
  };
  const sizeStyles = {
    default: "px-4 py-2",
    lg: "px-8 py-3 text-lg",
  };

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as { className?: string };
    return React.cloneElement(children as React.ReactElement, {
      ...{
        className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${childProps.className || ""}`,
      },
    });
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Components (unchanged)
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`rounded-lg shadow-lg p-6 ${className}`}>{children}</div>
);

const CardHeader: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle: React.FC<CardProps> = ({ className = "", children }) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);

const CardDescription: React.FC<CardProps> = ({ className = "", children }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
);

const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className = "", children }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
  >
    {children}
  </span>
);



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

// Animated Counter Component
import { useEffect } from "react";
import { useMotionValue, useAnimationFrame } from "framer-motion";

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const start = 0;

  useEffect(() => {
    if (isInView) {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (end - start) * progress;
        motionValue.set(value);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, motionValue]);

  const [displayValue, setDisplayValue] = useState(start);

  useAnimationFrame(() => {
    setDisplayValue(motionValue.get());
  });

  return (
    <span ref={ref}>
      {Math.floor(displayValue)}
      {suffix}
    </span>
  );
}

// Animated Section Component (unchanged)
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: easeOut } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PharmaChainLanding: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="/">
                <img
                  src="/logo.png"
                  alt="PharmaChain Logo"
                  className="h-8 w-auto"
                />
              </a>
              <p className="ml-3 font-bold">PharmaChain</p>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: "How it Works", href: "#how-it-works" },
                { label: "User Types", href: "#user-types" },
                { label: "Features", href: "#features" },
                { label: "About", href: "#about" },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-teal-600 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild variant="ghost" className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all">
                <a href="./login">Login</a>
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all">
                  <a href="./signup">Sign Up</a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </motion.button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {[
                  { label: "How it Works", href: "#how-it-works" },
                  { label: "User Types", href: "#user-types" },
                  { label: "Features", href: "#features" },
                  { label: "About", href: "#about" },
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button asChild variant="ghost" className="justify-start text-gray-600 hover:text-teal-600">
                    <a href="./login">Login</a>
                  </Button>
                  <Button asChild className="justify-start bg-teal-600 hover:bg-teal-700 text-white">
                    <a href="./signup">Sign Up</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="space-y-4" variants={staggerItem}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Badge className="bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 hover:from-teal-200 hover:to-teal-300 transition-all shadow-md">
                    <Star className="w-3 h-3 mr-1" />
                    Trusted by 50+ Pharma Companies
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  variants={staggerItem}
                >
                  Pharma Supply,{" "}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Streamlined
                  </motion.span>{" "}
                  &{" "}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Trusted
                  </motion.span>
                  .
                </motion.h1>
                <motion.p className="text-xl text-gray-600 leading-relaxed" variants={staggerItem}>
                  Connect manufacturers, wholesalers, distributors, and retailers in one secure platform. Streamline
                  your pharmaceutical supply chain with real-time tracking, verified networks, and seamless
                  transactions.
                </motion.p>
              </motion.div>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={staggerItem}>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                  >
                    <a href="./login">Get Started Free</a>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 relative overflow-hidden"
                whileHover={{ y: -10, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-50"></div>
                <img
                  src="/dashboard.jpg"
                  alt="PharmaChain Dashboard"
                  className="w-full h-auto rounded-lg relative z-10"
                />
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Users, number: 50, suffix: "+", label: "Active Companies" },
              { icon: TrendingUp, number: 60, suffix: "%", label: "Efficiency Increase" },
              { icon: Package, number: 100, suffix: "+", label: "Orders Processed" },
              { icon: Clock, number: 24, suffix: "/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div key={`stat-${index}`} className="text-center group" variants={staggerItem} whileHover={{ scale: 1.05 }}>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-teal-200 group-hover:to-teal-300 transition-all">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How it Works */}
      <AnimatedSection id="how-it-works" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How it Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with PharmaChain in four simple steps and transform your supply chain operations.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Register",
                description: "Create your account and verify your pharmaceutical business credentials.",
              },
              {
                step: "02",
                title: "Connect",
                description: "Link with verified suppliers, distributors, and partners in your network.",
              },
              {
                step: "03",
                title: "Order",
                description: "Place orders, track inventory, and manage transactions seamlessly.",
              },
              {
                step: "04",
                title: "Review",
                description: "Monitor performance, analyze data, and optimize your supply chain.",
              },
            ].map((item, index) => (
              <motion.div key={`how-it-works-${index}`} variants={staggerItem}>
                <motion.div
                  key={`card-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="relative border-2 border-gray-100 hover:border-teal-200 transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm group">
                    <CardHeader className="text-center">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.step}
                      </motion.div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">{item.description}</p>
                    </CardContent>
                    {index < 3 && (
                      <motion.div
                        className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-teal-300"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* User Types */}
      <AnimatedSection id="user-types" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Built for Every Player</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a manufacturer or retailer, PharmaChain adapts to your specific needs.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Building2,
                title: "Manufacturers",
                description:
                  "Streamline production planning, manage bulk orders, and maintain quality control across your distribution network.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Truck,
                title: "Wholesalers",
                description:
                  "Optimize inventory management, coordinate with multiple suppliers, and ensure efficient distribution to retailers.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Package,
                title: "Distributors",
                description:
                  "Track shipments in real-time, manage logistics efficiently, and maintain cold chain compliance.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Store,
                title: "Retailers",
                description:
                  "Access verified suppliers, manage stock levels, and ensure product authenticity for your customers.",
                color: "from-orange-500 to-orange-600",
              },
            ].map((userType, index) => (
              <motion.div key={`user-type-${index}`} variants={staggerItem}>
                <motion.div
                  key={`card-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="text-center hover:shadow-xl transition-all border-2 border-gray-100 hover:border-teal-200 bg-white/80 backdrop-blur-sm group h-full">
                    <CardHeader>
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${userType.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <userType.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                        {userType.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{userType.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Key Features */}
      <AnimatedSection id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to secure, streamline, and scale your pharmaceutical operations.
            </p>
          </motion.div>
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: MapPin,
                title: "Real-time Tracking",
                description:
                  "Monitor every shipment from origin to destination with GPS tracking, temperature monitoring, and delivery confirmations.",
                features: [
                  "GPS Location Tracking",
                  "Temperature Monitoring",
                  "Delivery Notifications",
                  "Route Optimization",
                ],
                gradient: "from-teal-500 to-cyan-600",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                description:
                  "Process transactions safely with encrypted payment systems, automated invoicing, and flexible payment terms.",
                features: [
                  "Encrypted Transactions",
                  "Automated Invoicing",
                  "Multiple Payment Methods",
                  "Credit Management",
                ],
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                icon: Shield,
                title: "Verified Network",
                description:
                  "Connect only with verified, compliant partners through our rigorous verification process and ongoing monitoring.",
                features: ["License Verification", "Compliance Monitoring", "Quality Assurance", "Audit Trails"],
                gradient: "from-green-500 to-emerald-600",
              },
            ].map((feature, index) => (
              <motion.div key={`feature-${index}`} variants={staggerItem}>
                <motion.div
                  key={`card-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="hover:shadow-xl transition-all border-2 border-gray-100 hover:border-teal-200 bg-white/80 backdrop-blur-sm group h-full">
                    <CardHeader>
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-teal-700 transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <motion.li
                            key={`feature-item-${index}-${idx}`}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-teal-600" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of pharmaceutical companies who trust PharmaChain for their supply chain needs.
            </p>
          </motion.div>
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote:
                  "PharmaChain has revolutionized our supply chain operations. We've reduced order processing time by 60% and improved inventory accuracy significantly.",
                name: "Sarah Johnson",
                title: "Supply Chain Director",
                company: "MedCore Pharmaceuticals",
                rating: 5,
              },
              {
                quote:
                  "The real-time tracking and verified network features give us complete confidence in our pharmaceutical distribution. Outstanding platform!",
                name: "Michael Chen",
                title: "Operations Manager",
                company: "HealthFirst Distributors",
                rating: 5,
              },
              {
                quote:
                  "As a retailer, PharmaChain connects us with verified suppliers and ensures product authenticity. It's been a game-changer for our business.",
                name: "Emily Rodriguez",
                title: "Procurement Lead",
                company: "CityMed Pharmacy Chain",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={`testimonial-${index}`} variants={staggerItem}>
                <motion.div
                  key={`card-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm group h-full">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={`star-${index}-${i}`}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        <div className="border-t pt-4">
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.title}</p>
                          <p className="text-sm text-teal-600">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Transform Your Supply Chain?</h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Join thousands of pharmaceutical companies already using PharmaChain to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 transition-all"
                >
                  Start Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">About PharmaChain</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our mission to revolutionize the pharmaceutical supply chain.
            </p>
          </motion.div>
          <motion.div
            className="prose max-w-3xl mx-auto text-gray-600"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={staggerItem}>
              PharmaChain is dedicated to transforming the pharmaceutical industry by providing a secure, efficient, and transparent platform for all stakeholders. Our mission is to streamline supply chain operations, ensuring that medications reach those who need them quickly and safely.
            </motion.p>
            <motion.p variants={staggerItem}>
              Founded in 2020, our team of experts in technology and pharmaceuticals has worked tirelessly to build a platform that addresses the unique challenges of the industry. From real-time tracking to verified networks, we empower manufacturers, wholesalers, distributors, and retailers to operate with confidence.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all group"
              >
                <a href="./about">Learn More</a>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-4" variants={staggerItem}>
                <div className="flex items-center space-x-2">
                  <a href="/">
                    <img
                      src="/logo.png"
                      alt="PharmaChain Logo"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>
                <p className="text-gray-400">
                  Streamlining pharmaceutical supply chains with secure, verified, and efficient solutions.
                </p>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                    <motion.div key={`social-${index}`} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                      <Icon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  {["Features", "Pricing", "API", "Integrations"].map((item, index) => (
                    <motion.li
                      key={`product-${index}`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <a href="#" className="hover:text-white transition-colors">
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  {["About", "Careers", "Press", "Contact"].map((item, index) => (
                    <motion.li
                      key={`company-${index}`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <a href={item === "About" ? "#about" : "#"} className="hover:text-white transition-colors">
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="space-y-4" variants={staggerItem}>
                <h3 className="text-lg font-semibold">Contact</h3>
                <div className="space-y-2 text-gray-400">
                  {[
                    { icon: Mail, text: "support@pharmachain.com" },
                    { icon: MapPinIcon, text: "Mumbai, India" },
                  ].map((item, index) => (
                    <motion.div
                      key={`contact-${index}`}
                      className="flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-400 text-sm">© 2025 PharmaChain. All rights reserved.</p>
              <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                  <motion.a key={`footer-link-${index}`} href="#" className="hover:text-white transition-colors" whileHover={{ y: -2 }}>
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
};

export default PharmaChainLanding;