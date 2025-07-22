import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">NepaliBazar</h3>
            <p className="text-gray-300 mb-4">
              Your trusted marketplace for authentic Nepali products. Connecting Nepal's rich culture with the world.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-orange-400" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-orange-400" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-orange-400" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-orange-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-orange-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-orange-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-orange-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/help" className="hover:text-orange-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-orange-400">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-orange-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-orange-400">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell with Us */}
          <div>
            <h4 className="font-semibold mb-4">Sell with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/seller/register" className="hover:text-orange-400">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/seller/guide" className="hover:text-orange-400">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link to="/seller/support" className="hover:text-orange-400">
                  Seller Support
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-orange-400">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NepaliBazar. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
