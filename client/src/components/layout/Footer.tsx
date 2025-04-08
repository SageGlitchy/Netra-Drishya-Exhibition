import { Link } from "wouter";
import { Instagram, Mail, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/Logo 1 Black.png";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Netra Photography Club" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-6">
              NETRA is the official photography club of our university, dedicated to capturing moments,
              telling stories, and nurturing visual artists since 2015.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/netra.club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com/netra.club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/netra.club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:contact@netra.club" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-gray-400 hover:text-white transition-colors">Gallery</a>
                </Link>
              </li>

              <li>
                <Link href="/events">
                  <a className="text-gray-400 hover:text-white transition-colors">Events</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">NETRA Photography Club</p>
              <p className="mb-2">Student Activity Center</p>
              <p className="mb-2">University Campus</p>
              <p className="mb-4">New Delhi, India</p>
              <p className="mb-2">
                <a href="mailto:contact@netra.club" className="hover:text-white transition-colors">
                  contact@netra.club
                </a>
              </p>
              <p>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} NETRA Photography Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
