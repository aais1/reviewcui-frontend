import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700 text-sm">
          {/* Section 1: About */}
          <div>
            <h3 className="font-semibold text-gray-900">ReviewCUI</h3>
            <p className="mt-2">
              Helping students make informed decisions about their education
              journey.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Departments */}
          <div>
            <h3 className="font-semibold text-gray-900">Departments</h3>
            <ul className="mt-2 space-y-1">
              <li>Computer Science</li>
              <li>Mathematics</li>
              <li>Physics</li>
            </ul>
          </div>

          {/* Section 4: Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} ReviewCUI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
