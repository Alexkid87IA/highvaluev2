import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Users, Trophy, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    expertise: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Partagez votre expertise avec notre communauté
            </h1>
            <p className="text-xl text-hv-white-800 mb-8">
              Rejoignez High Value pour inspirer et impacter positivement la vie de milliers de personnes
            </p>
            <a href="#contact-form" className="hv-button-primary inline-flex items-center">
              Je veux participer
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Production pro",
                description: "Équipe de tournage expérimentée et matériel haute qualité",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Large audience",
                description: "Accédez à notre communauté engagée de plus de 100K personnes",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Expertise valorisée",
                description: "Positionnez-vous comme expert dans votre domaine",
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Impact réel",
                description: "Contribuez à la croissance personnelle de nos viewers",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="hv-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-hv-white-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="hv-card p-8"
            >
              <h2 className="text-3xl font-semibold mb-6">Partagez votre histoire</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-hv-white-800 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-hv-white-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-hv-white-800 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                      placeholder="Votre numéro"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-hv-white-800 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                      placeholder="Votre entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-hv-white-800 mb-2">
                    Domaine d'expertise
                  </label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                  >
                    <option value="">Sélectionnez votre domaine</option>
                    <option value="business">Business & Entrepreneuriat</option>
                    <option value="tech">Tech & Innovation</option>
                    <option value="personal-dev">Développement Personnel</option>
                    <option value="leadership">Leadership & Management</option>
                    <option value="finance">Finance & Investissement</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-hv-white-800 mb-2">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-hv-dark-800/50 border border-hv-white-200 text-hv-white placeholder:text-hv-white-600 focus:outline-none focus:border-hv-turquoise"
                    placeholder="Parlez-nous de votre parcours et de ce que vous souhaitez partager..."
                  ></textarea>
                </div>

                <button type="submit" className="hv-button-primary w-full">
                  Envoyer ma candidature
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}