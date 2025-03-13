import React from 'react';
import { LogOut, LayoutDashboard, Users, Settings, FolderGit2, Bell, ChevronRight, Star, Activity } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-700 via-purple-700 to-pink-700">
      <nav className="bg-black/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">VOICE</div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#" className="relative group bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                    <div className="absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-white/0 via-white/70 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </a>
                  {['Projects', 'Team', 'Settings'].map((item, index) => (
                    <a
                      key={item}
                      href="#"
                      className="relative group text-white/70 hover:text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:bg-white/5"
                    >
                      {index === 0 && <FolderGit2 size={18} />}
                      {index === 1 && <Users size={18} />}
                      {index === 2 && <Settings size={18} />}
                      {item}
                      <div className="absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-white/0 via-white/70 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white/70 hover:text-white transition-colors duration-200">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm border border-white/10 hover:border-white/20"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">Welcome back, Alex</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">A</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: 'Quick Stats', color: 'indigo', stat: '24', label: 'Active Projects' },
              { icon: Star, title: 'Recent Activity', color: 'purple', stat: '12', label: 'Updates Today' },
              { icon: Bell, title: 'Notifications', color: 'pink', stat: '5', label: 'Unread Messages' }
            ].map((card, index) => (
              <div key={index} className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-{card.color}-500/10">
                <div className={`h-12 w-12 bg-${card.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`text-${card.color}-300`} size={24} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-300">{card.title}</h2>
                  <span className="text-2xl font-bold text-white/90">{card.stat}</span>
                </div>
                <p className="text-white/70">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Recent Projects</h2>
              <button className="text-white/70 hover:text-white flex items-center gap-1 text-sm transition-colors duration-200">
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Website Redesign', progress: 75, members: 4 },
                { name: 'Mobile App', progress: 45, members: 3 },
                { name: 'API Integration', progress: 90, members: 5 }
              ].map((project, index) => (
                <div key={index} className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FolderGit2 className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{project.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-white/50 text-sm">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {Array(project.members).fill(0).map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-black/20 flex items-center justify-center text-white text-xs font-medium"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <button className="text-white/50 hover:text-white transition-colors duration-200">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}