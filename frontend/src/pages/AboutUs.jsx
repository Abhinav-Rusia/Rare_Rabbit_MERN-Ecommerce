import { HiOutlineHeart, HiOutlineStar, HiOutlineGlobe, HiOutlineUsers } from "react-icons/hi";

const AboutUs = () => {
  const values = [
    {
      icon: HiOutlineHeart,
      title: "Passion for Fashion",
      description: "We believe fashion is a form of self-expression that should be accessible to everyone."
    },
    {
      icon: HiOutlineStar,
      title: "Quality First",
      description: "Every piece is carefully crafted with attention to detail and premium materials."
    },
    {
      icon: HiOutlineGlobe,
      title: "Sustainable Future",
      description: "Committed to ethical practices and environmental responsibility in everything we do."
    },
    {
      icon: HiOutlineUsers,
      title: "Community Driven",
      description: "Building a community where everyone feels confident and empowered in their style."
    }
  ];

  const team = [
    {
      name: "Abhinav Rusia",
      role: "Founder & CEO",
      description: "Visionary leader with a passion for innovative fashion and sustainable business practices."
    },
    {
      name: "Design Team",
      role: "Creative Directors",
      description: "Talented designers who bring fresh perspectives and cutting-edge trends to life."
    },
    {
      name: "Quality Team",
      role: "Quality Assurance",
      description: "Dedicated professionals ensuring every product meets our high standards."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                About Rare Rabbit
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We're more than just a fashion brand. We're a community of individuals who believe
                that style should be personal, accessible, and sustainable.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fashion store interior"
                className="rounded-lg shadow-lg w-full max-w-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to democratize fashion, Rare Rabbit began as a small idea
                to create clothing that speaks to the individual. We noticed a gap in the market
                for high-quality, affordable fashion that doesn't compromise on style or ethics.
              </p>
              <p>
                What started as a passion project has grown into a brand that serves thousands
                of customers worldwide. Our journey has been driven by one simple belief:
                everyone deserves to feel confident and comfortable in what they wear.
              </p>
              <p>
                Today, we continue to innovate and expand our offerings while staying true to
                our core values of quality, sustainability, and inclusivity.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Fashion design process"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our mission and vision guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To create exceptional fashion that empowers individuals to express their unique
                style while promoting sustainable and ethical practices throughout our supply chain.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a global leader in sustainable fashion, inspiring positive change in
                the industry while building a community where everyone feels valued and included.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values shape our culture and guide our decisions every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                <value.icon className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Rare Rabbit who make everything possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const teamImages = [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              ];
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={teamImages[index]}
                      alt={member.name}
                      className="rounded-lg h-48 w-48 object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gray-900 text-white rounded-lg p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-300">Numbers that reflect our commitment to excellence.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Join Our Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be part of our story and discover fashion that speaks to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/collections/all"
              className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="bg-white text-gray-900 border border-gray-300 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
