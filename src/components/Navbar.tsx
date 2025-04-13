import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="navbar bg-secondary shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            MYISU
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">{t('home')}</Link>
            <Link to="/dashboard" className="nav-link">{t('dashboard')}</Link>
            <Link to="/contact" className="nav-link">{t('contact')}</Link>
            
            <button
              onClick={toggleLanguage}
              className="nav-link flex items-center space-x-2"
            >
              <Globe size={20} />
              <span>{i18n.language.toUpperCase()}</span>
            </button>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="auth-button">
                {t('login')}
              </Link>
              <Link to="/register" className="auth-button">
                {t('register')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-secondary py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="nav-link">{t('home')}</Link>
              <Link to="/dashboard" className="nav-link">{t('dashboard')}</Link>
              <Link to="/contact" className="nav-link">{t('contact')}</Link>
              <button
                onClick={toggleLanguage}
                className="nav-link flex items-center space-x-2"
              >
                <Globe size={20} />
                <span>{i18n.language.toUpperCase()}</span>
              </button>
              <Link to="/login" className="auth-button text-center">
                {t('login')}
              </Link>
              <Link to="/register" className="auth-button text-center">
                {t('register')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

