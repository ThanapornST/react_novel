import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">อีเมล์</label>
          <input
            type="email"
            placeholder="Example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">รหัสผ่าน</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="123456"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <button type="button" className="text-sm text-gray-600 hover:underline">
              ลืมรหัสผ่าน?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          เข้าสู่ระบบ
        </button>

        <div className="text-center text-gray-500">หรือ</div>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_24dp.png" 
               alt="Google" 
               className="w-6 h-6 object-contain" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          คุณยังไม่มีบัญชีใช่หรือไม่?{' '}
          <button type="button" className="text-purple-600 hover:underline">
            สมัครสมาชิก
          </button>
        </p>
      </div>
    </form>
  );
}