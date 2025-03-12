import React from 'react';

export function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center backdrop-blur-md bg-white/30">
      <div className="text-xl font-semibold text-white">Logo</div>
      <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors">
        เข้าสู่ระบบ
      </button>
    </header>
  );
}