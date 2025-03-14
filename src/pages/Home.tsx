import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Home, FileText, PenSquare, Settings, Menu, X, LogOut, Plus } from 'lucide-react';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

export function HomePage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out z-30
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <Bot className="w-8 h-8 text-indigo-500" />
            <span className="font-semibold text-xl">VOICE</span>
          </div>
          
          {user ? (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-600">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </h3>
                  {user.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors"
              >
                <Plus size={16} />
                โปรเจกต์ใหม่
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="w-full bg-gray-900 text-white rounded-full py-2 px-4 text-sm font-medium mb-8 hover:bg-gray-800 transition-colors"
            >
              เข้าสู่ระบบ/สร้างบัญชี
            </button>
          )}

          <div className="space-y-2">
            <a href="#" className="flex items-center gap-3 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Home size={20} />
              <span className="text-sm">หน้าหลัก</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <FileText size={20} />
              <span className="text-sm">ส่งผลงานของฉัน</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <PenSquare size={20} />
              <span className="text-sm">ผลงานของฉัน</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Settings size={20} />
              <span className="text-sm">ตั้งค่า</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={16} />
              ออกจากระบบ
            </button>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          {/* Banner Carousel */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Banner"
              className="w-full h-[200px] lg:h-[280px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center px-6 lg:px-12">
              <div className="text-white">
                <h1 className="text-2xl lg:text-3xl font-bold mb-4">อัปเดตตอนใหม่</h1>
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all">
                  สร้างผลงาน
                </button>
              </div>
            </div>
            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
              <div className="w-2 h-2 rounded-full bg-white/50"></div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">นิยายเสียง</span>
              </div>
            </div>
            <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">พอดแคสต์</span>
              </div>
            </div>
            <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-purple-400 to-purple-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">นิยาย</span>
              </div>
            </div>
          </div>

          {/* Recommended Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">แนะนำ</h2>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">ดูทั้งหมด ›</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Novel cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">แม่มดสาวกับนายจอมมาร</h3>
                  <p className="text-xs text-gray-500 mt-1">โดย นักเขียนนิรนาม</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">33</span>
                    <span className="text-xs text-gray-500">67%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">ยอดนิยม</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-sm">All</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">โรแมนติก</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">ตลก</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">แฟนตาซี</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">สยองขวัญ</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">ลึกลับ</button>
              <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">กำลังภายใน</button>
            </div>
          </div>

          {/* Popular Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Novel cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">แม่มดสาวกับนายจอมมาร</h3>
                <p className="text-xs text-gray-500 mt-1">โดย นักเขียนนิรนาม</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">33</span>
                  <span className="text-xs text-gray-500">67%</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}