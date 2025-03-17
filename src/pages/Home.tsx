import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Home, FileText, PenSquare, Settings, Menu, X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

export function HomePage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNovelSlide, setCurrentNovelSlide] = useState(0);
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);
  const [currentNewSectionSlide, setCurrentNewSectionSlide] = useState(0);

  // Banner carousel data
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "อัปเดตตอนใหม่",
      buttonText: "สร้างผลงาน"
    },
    {
      image: "https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "เรื่องราวใหม่",
      buttonText: "อ่านเลย"
    },
    {
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "แนะนำสำหรับคุณ",
      buttonText: "ดูเพิ่มเติม"
    }
  ];

  // Novel data
  const novels = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: "แม่มดสาวกับนายจอมมาร",
    author: "นักเขียนนิรนาม",
    reads: 33,
    rating: 67,
    cover: "https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Popular novels data with different content
  const popularNovels = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 100,
    title: "ราชันย์แห่งความมืด",
    author: "นักเขียนนิรนาม",
    reads: 45,
    rating: 89,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Add new data array for the new section
  const newSectionNovels = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 200,
    title: "เมื่อคุณหนูกลายเป็นแมว",
    author: "นักเขียนนิรนาม",
    reads: 28,
    rating: 92,
    cover: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Number of items to show per slide
  const itemsPerSlide = 6;
  const totalNovelSlides = Math.ceil(novels.length / itemsPerSlide);
  const totalPopularSlides = Math.ceil(popularNovels.length / itemsPerSlide);
  const totalNewSectionSlides = Math.ceil(newSectionNovels.length / itemsPerSlide);

  // Auto slide effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNovelSlide((prev) => (prev + 1) % totalNovelSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [totalNovelSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPopularSlide((prev) => (prev + 1) % totalPopularSlides);
    }, 8000);
    return () => clearInterval(timer);
  }, [totalPopularSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewSectionSlide((prev) => (prev + 1) % totalNewSectionSlides);
    }, 9000);
    return () => clearInterval(timer);
  }, [totalNewSectionSlides]);

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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNovelSlide = (index: number) => {
    setCurrentNovelSlide(index);
  };

  const goToPopularSlide = (index: number) => {
    setCurrentPopularSlide(index);
  };

  const goToNewSectionSlide = (index: number) => {
    setCurrentNewSectionSlide(index);
  };

  const nextNovelSlide = () => {
    setCurrentNovelSlide((prev) => (prev + 1) % totalNovelSlides);
  };

  const prevNovelSlide = () => {
    setCurrentNovelSlide((prev) => (prev - 1 + totalNovelSlides) % totalNovelSlides);
  };

  const nextPopularSlide = () => {
    setCurrentPopularSlide((prev) => (prev + 1) % totalPopularSlides);
  };

  const prevPopularSlide = () => {
    setCurrentPopularSlide((prev) => (prev - 1 + totalPopularSlides) % totalPopularSlides);
  };

  const nextNewSectionSlide = () => {
    setCurrentNewSectionSlide((prev) => (prev + 1) % totalNewSectionSlides);
  };

  const prevNewSectionSlide = () => {
    setCurrentNewSectionSlide((prev) => (prev - 1 + totalNewSectionSlides) % totalNewSectionSlides);
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
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-indigo-500" />
              <span className="font-semibold text-xl">VOICE</span>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4">
            {!user && (
              <button 
                onClick={handleLoginClick}
                className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-black/90 transition-colors"
              >
                เข้าสู่ระบบ/สร้างบัญชี
              </button>
            )}
            {user && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-600">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {user.displayName || user.email?.split('@')[0]}
                  </h3>
                  <p className="text-sm text-gray-500">My Profile</p>
                </div>
              </div>
            )}
          </div>

          {/* Upload Button - Only show when logged in */}
          {user && (
            <div className="px-4 mb-4">
              <button className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
                <FileText size={16} />
                โปรเจคใหม่
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-2">
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
          </nav>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <LogOut size={16} />
                ออกจากระบบ
              </button>
            </div>
          )}
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
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          {/* Banner Carousel */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <div className="relative w-full h-[200px] lg:h-[280px]">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={item.image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center px-6 lg:px-12">
                    <div className="text-white">
                      <h1 className="text-2xl lg:text-3xl font-bold mb-4">{item.title}</h1>
                      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all">
                        {item.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-4' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
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

          {/* Recommended Section with Carousel */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">แนะนำ</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevNovelSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Previous novels"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextNovelSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Next novels"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentNovelSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalNovelSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-full"
                  >
                    {novels
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((novel) => (
                        <div key={novel.id} className="group cursor-pointer">
                          <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                            <img
                              src={novel.cover}
                              alt={novel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {novel.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            โดย {novel.author}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{novel.reads}</span>
                            <span className="text-xs text-gray-500">{novel.rating}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              {/* Novel Carousel Navigation Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalNovelSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToNovelSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentNovelSlide === index
                        ? 'bg-gray-800 w-4'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to novel slide ${index + 1}`}
                  />
                ))}
              </div>
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

          {/* Popular Section with Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">เรื่องยอดนิยม</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPopularSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Previous popular novels"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextPopularSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Next popular novels"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentPopularSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalPopularSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-full"
                >
                  {popularNovels
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((novel) => (
                      <div key={novel.id} className="group cursor-pointer">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                          <img
                            src={novel.cover}
                            alt={novel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {novel.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          โดย {novel.author}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{novel.reads}</span>
                          <span className="text-xs text-gray-500">{novel.rating}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            {/* Popular Carousel Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPopularSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPopularSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPopularSlide === index
                      ? 'bg-gray-800 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to popular slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* New Section with Carousel */}
          <div className="relative overflow-hidden mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">โปรโมท</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevNewSectionSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Previous new section novels"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextNewSectionSlide}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Next new section novels"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentNewSectionSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalNewSectionSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-full"
                >
                  {newSectionNovels
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((novel) => (
                      <div key={novel.id} className="group cursor-pointer">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
                          <img
                            src={novel.cover}
                            alt={novel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {novel.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          โดย {novel.author}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{novel.reads}</span>
                          <span className="text-xs text-gray-500">{novel.rating}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            {/* New Section Carousel Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalNewSectionSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToNewSectionSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentNewSectionSlide === index
                      ? 'bg-gray-800 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to new section slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}