
import { Phone, Mail, Linkedin, Youtube } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-purple-400" />
                <a href="tel:+17875256420" className="text-white hover:text-purple-400">
                  (787) 525-6420
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <a href="mailto:john@efexzium.com" className="text-white hover:text-purple-400">
                  john@efexzium.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/johnny-rodriguez-4825b9108/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-purple-500/10 rounded-full"
              >
                <Linkedin className="w-6 h-6 text-purple-400" />
              </a>
              <a 
                href="https://www.youtube.com/@AInovating" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-purple-500/10 rounded-full"
              >
                <Youtube className="w-6 h-6 text-purple-400" />
              </a>
            </div>
          </div>

          {/* Simple Contact Form */}
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 bg-gray-700 rounded text-white"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 bg-gray-700 rounded text-white"
              />
              <textarea
                placeholder="Your message"
                className="w-full p-3 bg-gray-700 rounded text-white h-32"
              />
              <button className="w-full py-3 bg-purple-600 text-white rounded">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}