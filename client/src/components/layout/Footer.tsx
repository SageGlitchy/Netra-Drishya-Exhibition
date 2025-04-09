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
            NETRA is a space for visual storytellers who capture moments that matter. From mirrorless and DSLR users to mobile photographers, we welcome all eyes behind the lens. Through events, workshops, and everyday exploration, we freeze memories and frame emotions — one click at a time.


            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/nitj_photography_club" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:photography@nitj.ac.in" 
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
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link>
              </li>

              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">Netra Photography Club</p>
              <p className="mb-4">Dr. BR Ambedkar National Institute of Technology<br />Jalandhar, Punjab</p>
              <div className="space-y-3">
                <p>
                  <span className="block font-medium text-white">Rishi Khandelwal</span>
                  <a href="tel:+918955227055" className="hover:text-white transition-colors">
                    +91 89552 27055
                  </a>
                </p>
                <p>
                  <span className="block font-medium text-white">Deepank Rana</span>
                  <a href="tel:+919501871465" className="hover:text-white transition-colors">
                    +91 95018 71465
                  </a>
                </p>
              </div>
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
