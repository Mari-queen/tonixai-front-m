
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8">
                <img src="/imgs/logo.png" alt="" />
              </div>
              <span className="text-2xl font-space font-bold">TONIXAI</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              The next-generation decentralized platform combining AI-generated multimedia
              with Telegram-based gamification on the TON blockchain.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/tonixaiOfficial" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-tonix-blue rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>
              </a>
              <a href="https://x.com/TonixAiOfficial?t=4MBpBT31FmUosyl7Itwk7A&s=09" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-tonix-blue rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-tonix-cyan transition-colors">Home</Link></li>
              <li><Link to="/ai-generation" className="hover:text-tonix-cyan transition-colors">AI Generation</Link></li>
              <li><a href="#" className="hover:text-tonix-cyan transition-colors">Telegram Bot</a></li>
              <li><a href="#" className="hover:text-tonix-cyan transition-colors">NFT Marketplace</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://tonixai.gitbook.io/tonixai-docs/" target="_blank" className="hover:text-tonix-cyan transition-colors">Whitepaper</a></li>
              <li><a href="/#vesting" className="hover:text-tonix-cyan transition-colors">Vesting</a></li>
              <li><a href="/#team" className="hover:text-tonix-cyan transition-colors">Team</a></li>
              <li><a href="/#team" className="hover:text-tonix-cyan transition-colors">Partners & Investors</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 TONIXAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://tonixai.gitbook.io/tonixai-docs/privacy-policy" target="_blank" className="text-gray-400 hover:text-tonix-cyan text-sm transition-colors">Privacy Policy</a>
            <a href="https://tonixai.gitbook.io/tonixai-docs/terms-of-service" target="_blank" className="text-gray-400 hover:text-tonix-cyan text-sm transition-colors">Terms of Service</a>
            <a href="https://tonixai.gitbook.io/tonixai-docs/legal-disclaimer-1" target="_blank" className="text-gray-400 hover:text-tonix-cyan text-sm transition-colors">Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
