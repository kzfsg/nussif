import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About Us', path: '/' },
  { label: 'Program', path: '/program' },
  { label: 'People', path: '/people' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHeroPage = true; // All pages have dark hero
  const isTransparent = !scrolled && isHeroPage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-card/95 backdrop-blur-xl border-b border-border'
        }`}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display font-semibold text-lg md:text-xl tracking-[0.25em]">
            <span className={isTransparent ? 'text-primary-foreground' : 'text-foreground'}>
              NUSSIF
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link pb-1 ${
                  isTransparent ? 'text-primary-foreground' : 'text-foreground'
                } ${location.pathname === item.path ? 'after:scale-x-100' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={isTransparent ? 'text-primary-foreground' : 'text-foreground'} size={22} />
            ) : (
              <Menu className={isTransparent ? 'text-primary-foreground' : 'text-foreground'} size={22} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-deep flex flex-col items-center justify-center gap-10">
          <button
            className="absolute top-5 right-6 text-primary-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-display text-3xl text-primary-foreground tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
