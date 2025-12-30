
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Eye,
  ArrowUpRight,
  Youtube,
  Instagram,
  Play
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', followers: 4000, revenue: 240 },
  { name: 'Tue', followers: 4200, revenue: 300 },
  { name: 'Wed', followers: 4100, revenue: 200 },
  { name: 'Thu', followers: 4800, revenue: 450 },
  { name: 'Fri', followers: 5100, revenue: 380 },
  { name: 'Sat', followers: 5400, revenue: 520 },
  { name: 'Sun', followers: 5900, revenue: 610 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">Welcome back, Alex</h2>
        <p className="text-zinc-400">Here's what's happening across your channels today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Followers', value: '1.2M', trend: '+12.5%', icon: <Users className="text-blue-400" /> },
          { label: 'Monthly Views', value: '8.4M', trend: '+18.2%', icon: <Eye className="text-emerald-400" /> },
          { label: 'Est. Revenue', value: '$12,450', trend: '+8.1%', icon: <DollarSign className="text-amber-400" /> },
          { label: 'Engagement', value: '5.2%', trend: '-2.4%', icon: <TrendingUp className="text-purple-400" /> },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Growth Overview</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#f5f5f5' }}
                />
                <Area type="monotone" dataKey="followers" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Platform Stats */}
        <div className="glass rounded-3xl p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-6">Platform Breakdown</h3>
          <div className="space-y-6 flex-1">
            {[
              { name: 'YouTube', icon: <Youtube size={20} className="text-red-500" />, value: '640k', sub: 'Subscribers', color: 'bg-red-500' },
              { name: 'Instagram', icon: <Instagram size={20} className="text-pink-500" />, value: '420k', sub: 'Followers', color: 'bg-pink-500' },
              { name: 'TikTok', icon: <Play size={20} className="text-teal-400" />, value: '1.1M', sub: 'Followers', color: 'bg-teal-400' },
            ].map((platform, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  {platform.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold">{platform.name}</p>
                    <p className="text-xs text-zinc-500">{platform.value}</p>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`${platform.color} h-full w-[70%] rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
            View Detailed Reports <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
