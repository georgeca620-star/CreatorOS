
import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Youtube, Instagram, Twitter } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MOCK_SCHEDULE = [
  { day: 15, title: 'My Morning Routine', platform: 'YouTube', type: 'Video' },
  { day: 15, title: 'Fitness Post', platform: 'Instagram', type: 'Post' },
  { day: 18, title: 'Weekly Vlog', platform: 'YouTube', type: 'Video' },
  { day: 22, title: 'Sponsorship Shoutout', platform: 'Twitter', type: 'Thread' },
];

const Scheduler: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Content Scheduler</h2>
          <p className="text-zinc-400">Plan and automate your social media pipeline.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
            <CalendarIcon size={20} /> View All
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
            <Plus size={20} /> Schedule Post
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">May 2024</h3>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-white/5 rounded-lg border border-white/10"><ChevronLeft size={18} /></button>
              <button className="p-2 hover:bg-white/5 rounded-lg border border-white/10"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-red-500"></div> YouTube
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div> Instagram
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {DAYS.map(day => (
            <div key={day} className="bg-zinc-900/50 p-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-widest">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNum = i - 3; // Mocking start of month
            const isToday = dayNum === 15;
            const scheduledItems = MOCK_SCHEDULE.filter(s => s.day === dayNum);

            return (
              <div key={i} className={`bg-[#0a0a0a] min-h-[140px] p-2 transition-colors hover:bg-white/[0.02] relative ${dayNum < 1 || dayNum > 31 ? 'opacity-20' : ''}`}>
                <span className={`text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full mb-2 ${isToday ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500'}`}>
                  {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                </span>
                
                <div className="space-y-1">
                  {scheduledItems.map((item, idx) => (
                    <div key={idx} className={`p-2 rounded-lg text-[10px] font-bold border flex flex-col gap-0.5 group cursor-pointer transition-all hover:scale-[1.02] ${
                      item.platform === 'YouTube' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      item.platform === 'Instagram' ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' :
                      'bg-teal-500/10 border-teal-500/20 text-teal-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span>{item.type}</span>
                        {item.platform === 'YouTube' ? <Youtube size={10} /> : <Instagram size={10} />}
                      </div>
                      <span className="truncate group-hover:underline">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
