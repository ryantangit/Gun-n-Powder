import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Gun n Powder" },
    { name: "description", content: "AI Enhanced Penetration Testing" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center flex-col justify-center bg-gray-300 px-4 py-10">
        <h1 className="text-4xl md:text-6xl font-light mb-10 text-black text-center">Gun n Powder</h1>
        <h2 className="text-xl md:text-2xl font-light mb-20 text-black text-center">AI Enhanced Penetration Testing</h2>

        <Link
          className="px-6 py-2 text-lg text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition duration-300 mb-24"
          to="/login"
        >
          Get Started
        </Link>
        
        {/* Expanded section for software highlights in columns */}
        <div className="text-center px-10 mb-10">
          <h3 className="text-2xl md:text-3xl font-light mb-5 text-black">Why Choose Gun n Powder for Your Cybersecurity Needs?</h3>
          <p className="text-lg font-light mb-8 text-gray-800">
            In an age where cyber threats are becoming increasingly sophisticated, businesses must stay proactive. Gun n Powder leverages advanced AI to offer an unparalleled penetration testing experience that protects your organization from potential breaches before they happen. Here's why to use Gun n Powder:
          </p>
          
          {/* Features list in column format */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg font-light text-gray-800 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">🔒</span>
              <p className="text-center">
                <strong>AI-Powered Detection:</strong> Our cutting-edge algorithms identify vulnerabilities with precision, uncovering weaknesses that traditional methods may miss.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">⚡</span>
              <p className="text-center">
                <strong>Real-Time Threat Intelligence:</strong> Receive immediate, actionable insights, enabling your team to respond quickly and effectively to security risks.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">🛠</span>
              <p className="text-center">
                <strong>Comprehensive Reporting:</strong> Generate clear, detailed reports that simplify complex data and help your team make informed security decisions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">🌐</span>
              <p className="text-center">
                <strong>Scalable Solutions:</strong> Whether a small business or a large enterprise, our software is designed to scale, adapting to your unique security needs.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">✅</span>
              <p className="text-center">
                <strong>Compliance Assurance:</strong> Meet industry standards and regulatory requirements with built-in compliance support that makes audits easier and faster.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">🧠</span>
              <p className="text-center">
                <strong>Continuous Learning:</strong> Our AI continuously evolves, learning from new data to stay ahead of emerging threats and protect your assets around the clock.
              </p>
            </div>
          </div>

          <p className="text-lg font-light text-gray-800 mb-24">
            Gun n Powder is more than just a security tool; it's a strategic partner in your organization's defense strategy, helping you maintain customer trust, protect valuable data, and confidently operate in a secure digital landscape.
          </p>
        </div>
      </div>

      {/* Bottom Section with About Us and Contact Info */}
      <div className="w-full bg-gray-400 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* About Us Section */}
          <div className="text-center mb-6">
            <h4 className="text-2xl font-light mb-4">About Us</h4>
            <p className="text-lg text-white-400">
              Gun n Powder is a leading cybersecurity company specializing in AI-driven penetration testing. Our mission is to provide businesses with cutting-edge tools to stay ahead of evolving cyber threats and maintain robust digital defenses.
            </p>
          </div>
          
          {/* Contact Us Section */}
          <div className="text-center mb-6">
            <h4 className="text-2xl font-light mb-4">Contact Us</h4>
            <div className="flex justify-center gap-8 mb-2">
              <div className="text-lg">
                <p className="mb-2">📧: <a href="mailto:support@gunnpowder.com" className="text-white-400">support@gunnpowder.com</a></p>
              </div>
              <div className="text-lg">
                <p className="mb-2">📞: +1 (800) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}