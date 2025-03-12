import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

interface LoginPageProps {
  onRegisterClick: () => void;
}

export function LoginPage({ onRegisterClick }: LoginPageProps) {
  const handleLogin = (email: string, password: string) => {
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="w-full max-w-md">
      <div className="backdrop-blur-lg bg-white/80 p-8 rounded-2xl shadow-2xl">
        <div>
          <h1 className="text-2xl font-bold text-center mb-2">เข้าสู่ระบบ</h1>
          <p className="text-gray-600 text-center mb-6">
            ยินดีต้อนรับ เข้าสู่ระบบเพื่อเริ่มการใช้งานของคุณกัน!
          </p>
          <LoginForm onSubmit={handleLogin} onRegisterClick={onRegisterClick} />
        </div>
      </div>
    </div>
  );
}