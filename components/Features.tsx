import React from 'react';
import { LayoutTemplate, MapPin, MessageCircle, FileText, Bot, BarChart3, TrendingUp, Smartphone } from 'lucide-react';
import FadeIn from './FadeIn';

const Features: React.FC = () => {
  return (
    <section 
      id="solutions" 
      className="py-24 lg:py-32 px-6 relative z-20 border-y border-white/5" 
      style={{ backgroundColor: '#030303' }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Une machine à vendre, <br className="hidden md:block" />
              <span className="text-emerald-500">pas juste une vitrine.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Chaque fonctionnalité NexGen est conçue pour capturer l'attention et transformer vos visiteurs en clients confirmés.
            </p>
          </FadeIn>
        </div>

        {/* 6 Conversion Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <FeatureCard 
            icon={<LayoutTemplate size={24} />}
            title="Structure de Vente"
            desc="Fini les sites brouillons. Nous déployons une architecture persuasive qui guide naturellement le visiteur vers le bouton d'action."
            delay={0}
          />
          <FeatureCard 
            icon={<MapPin size={24} />}
            title="Domination Locale (SEO)"
            desc="Soyez le premier résultat sur Google dans votre ville. Nous optimisons votre visibilité pour capter les clients de votre quartier."
            delay={100}
          />
          <FeatureCard 
            icon={<Smartphone size={24} />}
            title="Boutons de Contact"
            desc="Zéro friction. WhatsApp, Appel, ou RDV en un clic. Vos prospects peuvent vous joindre instantanément, où qu'ils soient."
            delay={200}
          />
          <FeatureCard 
            icon={<FileText size={24} />}
            title="Formulaires Intelligents"
            desc="Des formulaires courts et engageants qui se connectent à votre email. Ne ratez plus jamais une demande de devis."
            delay={300}
          />
          <FeatureCard 
            icon={<Bot size={24} />}
            title="Chatbot & IA (24/7)"
            desc="Un assistant virtuel qui accueille vos visiteurs, répond aux questions basiques et capture leurs coordonnées même la nuit."
            delay={400}
          />
          <FeatureCard 
            icon={<BarChart3 size={24} />}
            title="Suivi de Performance"
            desc="Plus de devinettes. Accédez à des statistiques claires sur vos visites et vos conversions depuis votre espace client."
            delay={500}
          />
        </div>

        {/* Dashboard Visual Spotlight (Proof of Analytics/Space) */}
        <div className="perspective-1000 w-full max-w-5xl mx-auto">
          <FadeIn delay={200} direction="up" className="h-full">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Inclus : Votre Espace Client
              </span>
            </div>
            
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/10 to-white/0 border border-white/10 shadow-2xl backdrop-blur-sm lg:rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/5 h-full relative shadow-inner">
                
                {/* Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20 opacity-50"></div>

                {/* Fake Browser Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0f0f0f]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  <div className="hidden sm:flex px-4 py-1 bg-black/50 rounded-full border border-white/5 text-[10px] text-neutral-500 font-mono items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    app.nexgen.com/dashboard
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 relative z-10 text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">Tableau de bord - Octobre</h3>
                      <p className="text-xs text-neutral-500">Données mises à jour en temps réel</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-emerald-500 text-black text-xs font-bold rounded hover:bg-emerald-400 transition-colors">
                            Demander une modif'
                        </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <DashboardStat title="Visiteurs Uniques" value="2,840" change="+12%" />
                    <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 relative overflow-hidden group col-span-2 md:col-span-1">
                      <div className="text-[10px] uppercase tracking-widest text-emerald-500/80 mb-2 font-semibold">Leads (Devis/Appels)</div>
                      <div className="text-3xl font-bold text-white mb-1">42</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                        <TrendingUp size={12} /> +8 cette semaine
                      </div>
                    </div>
                    <DashboardStat title="Taux de Conv." value="4.8%" change="+0.5%" neutral />
                     <DashboardStat title="Temps sur site" value="2m 14s" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 px-2 uppercase tracking-wider font-semibold mb-2">
                      <span>Dernières conversions capturées</span>
                      <span className="hidden sm:block">Source</span>
                    </div>
                    <LeadItem initials="JD" color="blue" name="Jean Dupont" action="Formulaire de devis" source="Google Ads" time="Il y a 2 min" />
                    <LeadItem initials="SM" color="purple" name="Sarah Martin" action="Clic Bouton Appel" source="SEO Local" time="Il y a 1h" />
                    <LeadItem initials="LR" color="orange" name="Lucas Roux" action="Message WhatsApp" source="Instagram" time="Il y a 3h" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <FadeIn delay={delay}>
    <div className="h-full bg-white/[0.02] backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)] group">
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500 group-hover:text-black">
            {icon}
        </div>
        <div>
          {/* H4 Typography: 20px (text-xl), Semibold (600) */}
          <h4 className="text-white text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{title}</h4>
          {/* Body Typography: Regular (400), Relaxed Leading */}
          <p className="text-sm text-neutral-400 leading-relaxed font-normal">{desc}</p>
        </div>
      </div>
    </div>
  </FadeIn>
);

const DashboardStat = ({ title, value, change, neutral }: { title: string, value: string, change?: string, neutral?: boolean }) => (
  <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-semibold">{title}</div>
    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{value}</div>
    {change && (
      <div className={`text-[10px] ${neutral ? 'text-emerald-400' : 'text-neutral-400'} flex items-center gap-1 font-medium`}>
        {change}
      </div>
    )}
  </div>
);

const LeadItem = ({ initials, color, name, action, source, time }: { initials: string, color: string, name: string, action: string, source: string, time: string }) => {
    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
        orange: 'bg-orange-500/20 text-orange-400 border-orange-500/20'
    }[color] || 'bg-gray-500/20 text-gray-400';

    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${colorClasses} border flex items-center justify-center text-[10px] font-bold`}>{initials}</div>
                <div>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                        {name}
                        <span className="text-[10px] text-neutral-600 font-normal">• {time}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 group-hover:text-neutral-400 transition-colors">{action}</div>
                </div>
            </div>
            <div className="hidden sm:block px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-400 font-medium border border-white/5">{source}</div>
        </div>
    )
}

export default Features;