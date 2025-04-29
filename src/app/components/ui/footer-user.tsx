import { Instagram, Facebook } from "lucide-react";

export default function FooterUser() {
  return (
    <footer className="border-t bg-gray-100 py-4">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        {/* Copyright Text */}
        <div className="mb-4 text-sm text-gray-600 md:mb-0">
          © 2025 Hopkins.
        </div>

        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0">
          {/* Footer Links */}
          <div className="text-sm text-gray-600">
            <a href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a href="/terms" className="hover:text-gray-900">
              Terms & Conditions
            </a>
            <span className="mx-2">•</span>
            <a href="/support" className="hover:text-gray-900">
              Get Support
            </a>
            <span className="mx-2">•</span>
            <a href="/faq" className="hover:text-gray-900">
              Frequently Asked Questions
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="ml-0 flex items-center space-x-4 md:ml-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
