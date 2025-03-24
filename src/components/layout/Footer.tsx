
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <Container size="lg" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4">PROGINEER</h3>
            <p className="text-stone-600 mb-4">Entreprise d'architecture, de maîtrise d'œuvre et de construction de maisons sur mesure en région PACA.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-stone-500 hover:text-khaki-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-stone-500 hover:text-khaki-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-stone-500 hover:text-khaki-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-stone-600 hover:text-khaki-600 transition-colors">Accueil</Link></li>
              <li><Link to="/estimation" className="text-stone-600 hover:text-khaki-600 transition-colors">Estimer mon projet</Link></li>
              <li><Link to="/prestations-maitre-oeuvre" className="text-stone-600 hover:text-khaki-600 transition-colors">Nos prestations</Link></li>
              <li><Link to="/realisations-architecte-maison" className="text-stone-600 hover:text-khaki-600 transition-colors">Nos réalisations</Link></li>
              <li><Link to="/equipe-maitrise-oeuvre" className="text-stone-600 hover:text-khaki-600 transition-colors">Notre équipe</Link></li>
              <li><Link to="/contact" className="text-stone-600 hover:text-khaki-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Nos services</h3>
            <ul className="space-y-2">
              <li><Link to="/prestations-maitre-oeuvre#construction" className="text-stone-600 hover:text-khaki-600 transition-colors">Construction sur mesure</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#renovation" className="text-stone-600 hover:text-khaki-600 transition-colors">Rénovation énergétique</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#extension" className="text-stone-600 hover:text-khaki-600 transition-colors">Extension & agrandissement</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#optimisation" className="text-stone-600 hover:text-khaki-600 transition-colors">Optimisation d'espace</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#design" className="text-stone-600 hover:text-khaki-600 transition-colors">Design d'espace</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-khaki-600 flex-shrink-0 mt-0.5" />
                <a href="tel:+33783762156" className="text-stone-600 hover:text-khaki-600 transition-colors">+33 7 83 76 21 56</a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-khaki-600 flex-shrink-0 mt-0.5" />
                <a href="mailto:progineer.moe@gmail.com" className="text-stone-600 hover:text-khaki-600 transition-colors">progineer.moe@gmail.com</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-khaki-600 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">Marseille, Saint-Tropez, Toulon, Nice, Cannes, Fréjus, région PACA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-stone-500">
                &copy; {new Date().getFullYear()} Progineer. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/mentions-legales" className="text-sm text-stone-500 hover:text-khaki-600 transition-colors">Mentions légales</Link>
              <Link to="/cgv" className="text-sm text-stone-500 hover:text-khaki-600 transition-colors">CGV</Link>
              <Link to="/faq" className="text-sm text-stone-500 hover:text-khaki-600 transition-colors">FAQ</Link>
              <Link to="/a-propos" className="text-sm text-stone-500 hover:text-khaki-600 transition-colors">À propos</Link>
            </div>
          </div>
        </div>

        {/* SEO Footer Text */}
        <div className="mt-8 text-xs text-stone-400 text-center md:text-left">
          <p>Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
