import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  PhoneCall
} from "lucide-react";
import { FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
      <footer className="bg-[#2b4182] text-[#ccc] text-sm">
        <div className="container mx-auto py-8 grid md:grid-cols-4 gap-6 px-4">
          <div>
            <h6 className="text-white text-lg mb-4">Quick Links</h6>
            <ul className="space-y-2">
              <li><a href="https://orpp.or.ke/political-parties-forms/" className="hover:underline">Political Parties Forms</a></li>
              <li><a href="https://orpp.or.ke/political-parties-liaison-committee/" className="hover:underline">Political Parties Liaison Committee</a></li>
              <li><a href="http://library.orpp.or.ke:7080/" className="hover:underline">Resource Centre - OPAC</a></li>
              <li><a href="https://orpp.or.ke/downloads/" className="hover:underline">Downloads</a></li>
              <li><a href="https://orpp.or.ke/faqs/" className="hover:underline">FAQs</a></li>
              <li><a href="https://orpp.or.ke/archives/" className="hover:underline">Archives</a></li>
            </ul>
          </div>
  
            <div>
              <h6 className="text-white text-lg mb-4">Related Links</h6>
              <ul className="space-y-2">
                <li><a href="https://vision2030.go.ke/" className="hover:underline">Kenya Vision 2030</a></li>
                <li><a href="https://www.iebc.or.ke/" className="hover:underline">IEBC</a></li>
                <li><a href="https://www.treasury.go.ke/" className="hover:underline">National Treasury</a></li>
              </ul>
            </div>
    
            <div className="space-y-6 text-white">
            <div>
              <h6 className="text-lg font-semibold mb-3">Connect</h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Twitter size={18} />
                  <a
                    href="https://x.com/ORPPKenya"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tweets by ORPP
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram size={18} />
                  <a
                    href="https://www.instagram.com/orpp_kenya"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Facebook size={18} />
                  <a
                    href="https://www.facebook.com/ORPPKE/"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaTiktok size={18} />
                  <a
                    href="https://tiktok.com/@ORPPKenya"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaWhatsapp size={18} />
                  <a
                    href="https://wa.me/254772281357"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaYoutube size={18} />
                  <a
                    href="https://youtube.com/@orppkenya5436?si=Q5FXc8AWLl9twe2y"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-lg font-semibold mb-3">Contact Us</h6>
              <ul className="space-y-2">
                <li>📞 <a href="tel:+254204022000" className="hover:underline">+254 (0) 204022000</a></li>
                <li>✉️ <a href="mailto:info@orpp.or.ke" className="hover:underline">info@orpp.or.ke</a></li>
                <li>📍 P.O. Box 1131-00606, Nairobi</li>
              </ul>
            </div>
            </div>
          <div>
            <h6 className="text-white text-lg mb-4 space-y-2">Location</h6>
            <p className="space-y-2">🏛 Lion Place, 1st, 2nd & 4th Floors<br />Karuna Close, Waiyaki Way, Westlands</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.369056119038!2d36.7948641!3d-1.2633674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17e4c3ae713b%3A0xb2bbf6cfb6b10ff4!2sLion%20Place!5e0!3m2!1sen!2ske!4v1721209253194!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
  
        <div className="border-t border-white/20 text-center py-4 text-white">
          &copy; {new Date().getFullYear()} ORPP. All rights reserved. | <a href="https://orpp.or.ke/data-privacy-statement/" className="underline">Data Privacy</a>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  