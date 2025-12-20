export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-[#e9f3f1]">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              CodeGang
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Building modern digital products with design, engineering, and
              intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Navigate
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Home</li>
              <li>Projects</li>
              <li>Team</li>
              <li>About</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Get in touch
            </h4>
            <p className="mt-3 text-sm text-slate-600">
              hello@codegang.dev
            </p>
            <p className="mt-1 text-sm text-slate-600">
              © {new Date().getFullYear()} CodeGang
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
