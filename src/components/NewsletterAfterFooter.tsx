import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterAfterFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-b from-hv-dark to-hv-dark/80">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-4">
                Recevez nos meilleurs contenus directement dans votre boîte mail
              </h2>
              <p className="text-hv-white/80 mb-8 max-w-2xl mx-auto">
                Un email par semaine, sans spam, uniquement de la valeur ajoutée pour votre croissance personnelle et professionnelle.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="flex-grow px-4 py-3 rounded-lg bg-hv-white/10 border border-hv-white/20 text-hv-white placeholder:text-hv-white/50 focus:outline-none focus:ring-2 focus:ring-hv-turquoise"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-hv-blue to-hv-turquoise text-hv-dark font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-hv-dark/30 border-t-hv-dark rounded-full animate-spin"></div>
                  ) : (
                    <>
                      S'abonner
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-hv-dark/30 backdrop-blur-sm border border-hv-white/10 rounded-lg p-8 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-hv-blue to-hv-turquoise flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-hv-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Inscription réussie</h3>
              <p className="text-hv-white/80">
                Merci pour votre inscription ! Vérifiez votre boîte mail pour confirmer.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}