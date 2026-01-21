import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Activity, 
  Search, 
  MoreVertical, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  LogOut,
  ShieldAlert,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="pt-24 pb-12 px-6 min-h-screen bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <FadeIn>
            <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-bold uppercase tracking-wider">
                    Admin
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Administration NexGen</h1>
            </div>
            <p className="text-neutral-400 mt-1 ml-1">Vue d'ensemble de la flotte de sites clients.</p>
          </FadeIn>
          
          <FadeIn delay={100} className="flex gap-3">
             <button className="px-4 py-2 bg-emerald-500 text-neutral-950 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Plus size={18} />
                Ajouter un client
             </button>
             <Link to="/login" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                <LogOut size={16} className="text-neutral-400" />
             </Link>
          </FadeIn>
        </div>

        {/* KPI Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <KpiCard 
                title="MRR (Revenu Récurrent)" 
                value="12,450 €" 
                trend="+850 €" 
                isPositive 
                icon={<CreditCard size={20} />} 
                delay={0}
            />
            <KpiCard 
                title="Clients Actifs" 
                value="142" 
                trend="+5 ce mois" 
                isPositive 
                icon={<Users size={20} />} 
                delay={100}
            />
            <KpiCard 
                title="Taux d'impayés" 
                value="1.4%" 
                trend="-0.2%" 
                isPositive 
                icon={<ShieldAlert size={20} />} 
                delay={200}
            />
            <KpiCard 
                title="Tickets Ouverts" 
                value="8" 
                trend="+2 hier" 
                isPositive={false} 
                icon={<Activity size={20} />} 
                delay={300}
            />
        </div>

        {/* Client Management Table */}
        <FadeIn delay={400}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden">
                {/* Table Header / Toolbar */}
                <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="font-semibold text-white flex items-center gap-2">
                        Liste des Clients 
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 text-xs">142</span>
                    </h2>
                    
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                            <input 
                                type="text" 
                                placeholder="Rechercher..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full sm:w-64 placeholder:text-neutral-600"
                            />
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/[0.02] text-neutral-500 font-medium border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Client / Société</th>
                                <th className="px-6 py-4">Offre</th>
                                <th className="px-6 py-4">État Site</th>
                                <th className="px-6 py-4">Facturation</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            <ClientRow 
                                name="Alexandre Dumont" 
                                company="Alex Rénovation" 
                                email="alex@renovation.com"
                                plan="Boost" 
                                siteStatus="online" 
                                billingStatus="paid"
                                amount="99€"
                            />
                            <ClientRow 
                                name="Sarah Connor" 
                                company="Cyberdyne Systems" 
                                email="sarah@cyberdyne.com"
                                plan="Business" 
                                siteStatus="maintenance" 
                                billingStatus="paid"
                                amount="199€"
                            />
                            <ClientRow 
                                name="Jean Valjean" 
                                company="Madeleine Corp" 
                                email="jean@madeleine.fr"
                                plan="Presence" 
                                siteStatus="online" 
                                billingStatus="late"
                                amount="49€"
                            />
                            <ClientRow 
                                name="Marie Curie" 
                                company="Radium Labs" 
                                email="marie@radium.io"
                                plan="Business" 
                                siteStatus="online" 
                                billingStatus="paid"
                                amount="199€"
                            />
                            <ClientRow 
                                name="Tony Stark" 
                                company="Stark Industries" 
                                email="tony@stark.com"
                                plan="Boost" 
                                siteStatus="offline" 
                                billingStatus="cancelled"
                                amount="99€"
                            />
                             <ClientRow 
                                name="Bruce Wayne" 
                                company="Wayne Enterprises" 
                                email="bruce@wayne.com"
                                plan="Business" 
                                siteStatus="online" 
                                billingStatus="paid"
                                amount="199€"
                            />
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Visual) */}
                <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
                    <div>Affichage de 1-6 sur 142</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50">Précédent</button>
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white">Suivant</button>
                    </div>
                </div>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

const KpiCard = ({ title, value, trend, isPositive, icon, delay }: { title: string, value: string, trend: string, isPositive: boolean, icon: React.ReactNode, delay: number }) => (
    <FadeIn delay={delay}>
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-xl hover:border-white/20 transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-neutral-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
            <div className="text-neutral-500 text-xs font-medium uppercase tracking-wide mb-1">{title}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
        </div>
    </FadeIn>
);

const ClientRow = ({ name, company, email, plan, siteStatus, billingStatus, amount }: any) => {
    
    const getPlanBadge = (p: string) => {
        if (p === 'Business') return <span className="px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase">Business</span>
        if (p === 'Boost') return <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Boost</span>
        return <span className="px-2 py-0.5 rounded border border-neutral-500/30 bg-white/5 text-neutral-400 text-[10px] font-bold uppercase">Presence</span>
    }

    const getSiteStatus = (s: string) => {
        if (s === 'online') return <div className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={14}/> En ligne</div>
        if (s === 'maintenance') return <div className="flex items-center gap-2 text-xs text-orange-400"><Clock size={14}/> Maintenance</div>
        return <div className="flex items-center gap-2 text-xs text-red-400"><ShieldAlert size={14}/> Hors ligne</div>
    }

    const getBillingStatus = (s: string) => {
        if (s === 'paid') return <span className="text-neutral-400 text-xs">À jour</span>
        if (s === 'late') return <span className="text-red-400 font-bold text-xs">Retard</span>
        return <span className="text-neutral-600 text-xs">Annulé</span>
    }

    return (
        <tr className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-white text-sm">{name}</div>
                        <div className="text-xs text-neutral-500">{company}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {getPlanBadge(plan)}
            </td>
            <td className="px-6 py-4">
                {getSiteStatus(siteStatus)}
                <div className="text-[10px] text-neutral-600 mt-0.5">Uptime: 99.9%</div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{amount}</span>
                    {getBillingStatus(billingStatus)}
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button className="p-1.5 hover:bg-white/10 rounded text-neutral-500 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                </button>
            </td>
        </tr>
    )
}

export default AdminDashboard;