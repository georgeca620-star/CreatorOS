
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Handshake, 
  FileText, 
  Calendar, 
  Zap, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
    { name: 'Brand Deals', icon: <Handshake size={20} />, path: '/brand-deals' },
    { name: 'Invoices', icon: <FileText size={20} />, path: '/invoices' },
    { name: 'Scheduler', icon: <Calendar size={20} />, path: '/scheduler' },
    { name: 'AI Studio', icon: <Zap size={20} />, path: '/ai-tools' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            C
          </div>
          <span className="text-lg font-bold">CreatorOS</span>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/5 rounded">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </NavLink>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Current Plan</p>
          <p className="text-sm font-bold text-white mb-3">Pro Annual</p>
          <div className="w-full bg-zinc-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">12 days left in billing cycle</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
