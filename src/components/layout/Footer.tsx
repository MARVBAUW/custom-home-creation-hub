
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/common/Logo';

const Footer = () => {
  return (
    <footer className="bg-progineer-dark text-white">
      <Container size="lg" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Logo variant="white" withTagline className="mx-auto md:mx-0 mb-4" />
            <p className="text-white/80 mb-4">Entreprise d'architecture, de maîtrise d'œuvre et de construction de maisons sur mesure en région PACA.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-progineer-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-progineer-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-white/70 hover:text-progineer-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 text-center md:text-left">Navigation</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/" className="text-white/70 hover:text-progineer-gold transition-colors">Accueil</Link></li>
              <li><Link to="/estimation" className="text-white/70 hover:text-progineer-gold transition-colors">Estimer mon projet</Link></li>
              <li><Link to="/prestations-maitre-oeuvre" className="text-white/70 hover:text-progineer-gold transition-colors">Nos prestations</Link></li>
              <li><Link to="/realisations-architecte-maison" className="text-white/70 hover:text-progineer-gold transition-colors">Nos réalisations</Link></li>
              <li><Link to="/equipe-maitrise-oeuvre" className="text-white/70 hover:text-progineer-gold transition-colors">Notre équipe</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-progineer-gold transition-colors">Contact</Link></li>
              <li><Link to="/parrainage-travaux" className="text-white/70 hover:text-progineer-gold transition-colors">Parrainage</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 text-center md:text-left">Nos services</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/prestations-maitre-oeuvre#construction" className="text-white/70 hover:text-progineer-gold transition-colors">Construction sur mesure</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#renovation" className="text-white/70 hover:text-progineer-gold transition-colors">Rénovation énergétique</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#extension" className="text-white/70 hover:text-progineer-gold transition-colors">Extension & agrandissement</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#optimisation" className="text-white/70 hover:text-progineer-gold transition-colors">Optimisation d'espace</Link></li>
              <li><Link to="/prestations-maitre-oeuvre#design" className="text-white/70 hover:text-progineer-gold transition-colors">Design d'espace</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 text-center md:text-left">Contact</h3>
            <ul className="space-y-3 text-center md:text-left">
              <li className="flex items-start justify-center md:justify-start">
                <Phone className="h-5 w-5 mr-2 text-progineer-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+33783762156" className="text-white/70 hover:text-progineer-gold transition-colors">+33 7 83 76 21 56</a>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <Mail className="h-5 w-5 mr-2 text-progineer-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:progineer.moe@gmail.com" className="text-white/70 hover:text-progineer-gold transition-colors">progineer.moe@gmail.com</a>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-2 text-progineer-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Marseille, Saint-Tropez, Toulon, Nice, Cannes, Fréjus, région PACA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-white/50">
                &copy; {new Date().getFullYear()} Progineer. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/mentions-legales" className="text-sm text-white/50 hover:text-progineer-gold transition-colors">Mentions légales</Link>
              <Link to="/cgv" className="text-sm text-white/50 hover:text-progineer-gold transition-colors">CGV</Link>
              <Link to="/faq" className="text-sm text-white/50 hover:text-progineer-gold transition-colors">FAQ</Link>
              <Link to="/a-propos" className="text-sm text-white/50 hover:text-progineer-gold transition-colors">À propos</Link>
            </div>
          </div>
        </div>

        {/* SEO Footer Text */}
        <div className="mt-8 text-xs text-white/30 text-center md:text-left">
          <p>Ingénieur, maître d'œuvre à Marseille et en PACA – Spécialiste en construction de maisons sur mesure, rénovation et extension. Nos architectes et ingénieurs vous accompagnent de A à Z.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
