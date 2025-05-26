import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days within India. Express shipping is available for 1-2 business days delivery. International shipping takes 7-14 business days depending on the destination."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders above ₹999. For orders below ₹999, a shipping fee of ₹40 applies."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section of your account."
        },
        {
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Please contact our support team immediately if you need assistance."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for all items in original condition with tags attached. Items must be unworn, unwashed, and in their original packaging."
        },
        {
          question: "How do I return an item?",
          answer: "Log into your account, go to 'My Orders', select the item you want to return, and follow the return process. We'll arrange a pickup from your address at no extra cost."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item. The amount will be credited to your original payment method."
        },
        {
          question: "Can I exchange an item for a different size?",
          answer: "Yes! You can exchange items for a different size within 30 days. The exchange process is the same as returns, and we'll send you the new size once we receive the original item."
        }
      ]
    },
    {
      title: "Products & Sizing",
      faqs: [
        {
          question: "How do I find the right size?",
          answer: "Each product page has a detailed size chart. We recommend measuring yourself and comparing with our size guide. If you're between sizes, we generally recommend sizing up for a comfortable fit."
        },
        {
          question: "Are your products true to size?",
          answer: "Yes, our products are designed to fit true to size according to our size charts. However, fit can vary by style and personal preference. Check individual product reviews for fit feedback from other customers."
        },
        {
          question: "What materials do you use?",
          answer: "We use high-quality materials including cotton, linen, wool, and sustainable fabrics. Each product page lists the exact material composition and care instructions."
        },
        {
          question: "Do you have a size guide?",
          answer: "Yes! You can find our comprehensive size guide on each product page and in the footer of our website. It includes measurements for all clothing categories."
        }
      ]
    },
    {
      title: "Account & Payment",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top right corner, enter your email and create a password. You'll receive a verification email to activate your account."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, UPI, net banking, PayPal, and cash on delivery (COD) for orders within India."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers."
        },
        {
          question: "Can I save multiple addresses?",
          answer: "Yes, you can save multiple shipping addresses in your account for faster checkout. You can also set a default address for convenience."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Find answers to common questions about our products, shipping, returns, and more.
                Can't find what you're looking for? Contact our support team.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Customer service and support"
                className="rounded-lg shadow-lg w-full max-w-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <HiChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <HiChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              Contact Support
            </a>
            <a
              href="mailto:hello@rarerabbit.com"
              className="bg-white text-gray-900 border border-gray-300 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gray-900 text-white rounded-lg p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Help</h2>
            <p className="text-gray-300">Need immediate assistance? Try these quick options.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">Live Chat</div>
              <div className="text-gray-300 mb-4">Available 9AM - 6PM</div>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                Start Chat
              </button>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Call Us</div>
              <div className="text-gray-300 mb-4">+91 1234 567 890</div>
              <a
                href="tel:+911234567890"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 inline-block"
              >
                Call Now
              </a>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">WhatsApp</div>
              <div className="text-gray-300 mb-4">Quick responses</div>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 inline-block"
              >
                Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
