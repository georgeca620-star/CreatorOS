
import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Download, Mail } from 'lucide-react';
import { BrandDeal } from '../types';

const MOCK_DEALS: BrandDeal[] = [
  { id: '1', brandName: 'NordVPN', status: 'Signed', amount: 5000, dueDate: '2024-05-15' },
  { id: '2', brandName: 'BetterHelp', status: 'Negotiating', amount: 3200, dueDate: '2024-06-01' },
  { id: '3', brandName: 'SquareSpace', status: 'Completed', amount: 4500, dueDate: '2024-04-20' },
  { id: '4', brandName: 'Raid Shadow Legends', status: 'Sent', amount: 12000, dueDate: '2024-05-25' },
];

const BrandDeals: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Brand Deals</h2>
          <p className="text-zinc-400">Manage your sponsorships and active campaigns.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
          <Plus size={20} /> New Deal
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search brands..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
            <Filter size={18} /> Filter
          </button>
          <select className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-zinc-400 outline-none">
            <option>All Statuses</option>
            <option>Negotiating</option>
            <option>Signed</option>
          </select>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-500 text-sm font-medium">
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_DEALS.map((deal) => (
                <tr key={deal.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 uppercase tracking-tighter">
                        {deal.brandName.substring(0, 2)}
                      </div>
                      <span className="font-bold">{deal.brandName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      deal.status === 'Signed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      deal.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      deal.status === 'Negotiating' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium">
                    ${deal.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {new Date(deal.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg text-zinc-500 transition-colors" title="Download Contract">
                        <Download size={18} />
                      </button>
                      <button className="p-2 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-lg text-zinc-500 transition-colors" title="Email Client">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrandDeals;
