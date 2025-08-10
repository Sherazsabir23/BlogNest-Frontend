const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-6">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - Brand */}
        <div>
          <h3 className="text-slate-100 text-xl font-semibold mb-3">YourBrand</h3>
          <p className="text-sm leading-relaxed">
            Empowering your journey with modern solutions and simple design.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h4 className="text-slate-100 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-sky-400">Home</a></li>
            <li><a href="#" className="hover:text-sky-400">About</a></li>
            <li><a href="#" className="hover:text-sky-400">Services</a></li>
            <li><a href="#" className="hover:text-sky-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h4 className="text-slate-100 font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-sky-400">Blog</a></li>
            <li><a href="#" className="hover:text-sky-400">Help Center</a></li>
            <li><a href="#" className="hover:text-sky-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-sky-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h4 className="text-slate-100 font-semibold mb-3">Newsletter</h4>
          <p className="text-sm mb-3">Subscribe to get the latest updates.</p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-slate-800 text-white px-3 py-2 rounded w-full text-sm outline-none"
            />
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-slate-700 pt-5 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
