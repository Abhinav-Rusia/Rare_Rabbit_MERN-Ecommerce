import { useState } from "react";
import { toast } from "sonner";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePaperAirplane
} from "react-icons/hi";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoTiktok,
  IoLogoDiscord
} from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Message sent successfully! We'll get back to you soon 🚀");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: HiOutlineMail,
      title: "Email Us",
      info: "hello@rarerabbit.com",
      subtitle: "We reply within 24 hours"
    },
    {
      icon: HiOutlinePhone,
      title: "Call Us",
      info: "+91 1234 567 890",
      subtitle: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: HiOutlineLocationMarker,
      title: "Visit Us",
      info: ", India",
      subtitle: "Fashion Capital"
    },
    {
      icon: HiOutlineClock,
      title: "Business Hours",
      info: "Mon - Fri: 9AM - 6PM",
      subtitle: "Weekend: 10AM - 4PM"
    }
  ];

  const socialLinks = [
    { icon: IoLogoInstagram, url: "#", color: "hover:text-pink-500", label: "Instagram" },
    { icon: RiTwitterXLine, url: "#", color: "hover:text-gray-800", label: "X (Twitter)" },
    { icon: IoLogoTiktok, url: "#", color: "hover:text-black", label: "TikTok" },
    { icon: IoLogoDiscord, url: "#", color: "hover:text-indigo-500", label: "Discord" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Have questions or need assistance? We're here to help.
                Get in touch with us and we'll respond as soon as possible.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Customer support team"
                className="rounded-lg shadow-lg w-full max-w-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send us a message
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-500'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-gray-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-gray-500'
                  }`}
                  placeholder="Subject of your message"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-gray-500'
                  }`}
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg">
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-100 text-gray-700`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-800 font-medium mb-1">
                        {item.info}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                Follow Us
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Stay connected with us on social media for updates and news.
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className={`p-3 bg-gray-100 rounded-lg text-gray-700 ${social.color} hover:bg-gray-200 transition-all duration-200`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            For urgent inquiries, reach out to us directly through email or phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@rarerabbit.com"
              className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Email Us Directly
            </a>
            <a
              href="tel:+911234567890"
              className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
