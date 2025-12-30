
import React from 'react';
import { Plus, Download, ExternalLink, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Invoice } from '../types';

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', client: 'Blueberry Tech', amount: 2400.00, status: 'Paid', date: '2024-04-12' },
  { id: 'INV-002', client: 'FastStream', amount: 1500.00, status: 'Pending', date: '2024-05-01' },
  { id: 'INV-003', client: 'Glow Up Cosmetics', amount: 4800.00, status: 'Overdue', date: '2024-03-25' },
  { id: 'INV-004', client: 'Adventure Gear Co', amount: 3200.00, status: 'Paid', date: '2024-04-05' },
];

const Invoices: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Invoices</h2>
          <p className="text-zinc-400">Track and manage your incoming professional payments.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
          <Plus size={20} /> Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Outstanding', value: '$6,300', icon: <Clock size={20} className="text-amber-400" /> },
          { label: 'Paid (Last 30d)', value: '$12,450', icon: <CheckCircle2 size={20} className="text-emerald-400" /> },
          { label: 'Overdue', value: '$4,800', icon: <AlertCircle size={20} className="text-rose-400" /> },
        ].map((item, i) => (
          <div key={i} className="glass p-5 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{item.label}</p>
              <h4 className="text-xl font-bold">{item.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-500 text-sm font-medium">
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 font-bold text-blue-400">{inv.id}</td>
                  <td className="px-6 py-5 font-medium">{inv.client}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-zinc-400 text-sm">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 font-bold">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 transition-colors" title="Download PDF">
                        <Download size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 transition-colors" title="Payment Link">
                        <ExternalLink size={18} />
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

export default Invoices;
