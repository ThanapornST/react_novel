import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';

interface RegisterPageProps {
  onLoginClick: () => void;
}

export function RegisterPage({ onLoginClick }: RegisterPageProps) {
  const handleRegister = (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: File;
  }) => {
    // Handle registration logic here
    console.log('Registration data:', data);
  };

  return (
    <div className="w-full max-w-md">
      <div className="backdrop-blur-lg bg-white/80 p-8 rounded-2xl shadow-2xl">
        <div>
          <h1 className="text-2xl font-bold text-center mb-2">ลงทะเบียน</h1>
          <p className="text-gray-600 text-center mb-6">
            ยินดีต้อนรับ ลงทะเบียนบัญชีเพื่อเริ่มการใช้งานของคุณกัน!
          </p>
          <RegisterForm onSubmit={handleRegister} onLoginClick={onLoginClick} />
        </div>
      </div>
    </div>
  );
}