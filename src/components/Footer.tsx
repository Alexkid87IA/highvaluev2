import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-hv-dark/60 border-t border-hv-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-4">
              <span className="text-2xl font-semibold tracking-tighter text-hv-white">
                High Value
              </span>
            </a>
            <p className="text-hv-white/70 max-w-md mb-6">
              High Value est une plateforme de contenus premium dédiés au développement personnel, professionnel et à l'entrepreneuriat.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
                { icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" },
                { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-hv-dark/80 border border-hv-white/10 flex items-center justify-center text-hv-white/80 hover:text-hv-turquoise hover:border-hv-turquoise transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              {["Business", "Mental", "Story", "Société", "Émission"].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase()}`} className="text-hv-white/70 hover:text-hv-turquoise transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2">
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Politique de confidentialité", href: "/confidentialite" },
                { label: "CGU", href: "/cgu" },
                { label: "Contact", href: "/contact" },
                { label: "À propos", href: "/a-propos" }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-hv-white/70 hover:text-hv-turquoise transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-hv-white/10 mt-12 pt-6 text-center text-hv-white/60 text-sm">
          © 2025 High Value. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}