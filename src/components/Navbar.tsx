import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'About Us', path: '/' },
  { label: 'Program', path: '/program' },
  { label: 'People', path: '/people' },
  { label: 'Recruitment', path: '/recruitment' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Recede while reading downward, return on any upward scroll
      if (y > 400 && y - lastY.current > 6) {
        setHidden(true);
      } else if (lastY.current - y > 6 || y < 400) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHidden(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isTransparent = !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: hidden && !mobileOpen ? -96 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-card/80 glass border-b border-border/50 shadow-sm'
        }`}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="font-display font-semibold text-lg md:text-xl tracking-[0.25em] transition-colors duration-300"
          >
            <span className={isTransparent ? 'text-primary-foreground' : 'text-foreground'}>
              NUSSIF
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link pb-1 transition-colors duration-300 ${
                  isTransparent ? 'text-primary-foreground' : 'text-foreground'
                } ${location.pathname === item.path ? 'after:scale-x-100' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="text-primary-foreground" size={22} />
            ) : (
              <Menu className={isTransparent ? 'text-primary-foreground' : 'text-foreground'} size={22} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-navy-deep flex flex-col items-center justify-center"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={item.path}
                  className="block py-4 font-display text-3xl md:text-4xl text-primary-foreground tracking-wide hover:text-[hsl(var(--gold))] transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-20 w-16 h-px bg-[hsl(var(--gold)/0.4)] origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
