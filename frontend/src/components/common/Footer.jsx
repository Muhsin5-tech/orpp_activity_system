function Footer() {
    return (
      <footer className="bg-[#1F3A93] text-[#ccc] text-sm">
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
  
          <div>
            <h6 className="text-white text-lg mb-4">Connect</h6>
            <li><a href="https://x.com/ORPPKenya" className="hover:underline">Tweets by ORPPKenya</a></li>
          </div>
  
          <div>
            <h6 className="text-white text-lg mb-4">Location</h6>
            <p>🏛 Lion Place, 1st, 2nd & 4th Floors<br />Karuna Close, Waiyaki Way, Westlands</p>
            <p>📞 +254(0) 204022000</p>
            <p>📧 info@orpp.or.ke</p>
            <p>📍 P.O. Box 1131-00606, Nairobi</p>
          </div>
        </div>
  
        <div className="border-t border-white/20 text-center py-4 text-white">
          &copy; {new Date().getFullYear()} ORPP. All rights reserved. | <a href="https://orpp.or.ke/data-privacy-statement/" className="underline">Data Privacy</a>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  