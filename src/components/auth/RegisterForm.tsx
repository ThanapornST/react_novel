import React, { useState, ChangeEvent } from 'react';
import { EyeOff, Eye, Upload } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: File;
  }) => void;
  onLoginClick: () => void;
}

export function RegisterForm({ onSubmit, onLoginClick }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const errors = {
    fullName: !formData.fullName && touched.fullName ? 'กรุณากรอกชื่อ-นามสกุล' : '',
    email: !formData.email && touched.email ? 'กรุณากรอกอีเมล์' : '',
    password: !formData.password && touched.password ? 'กรุณากรอกรหัสผ่าน' : '',
    confirmPassword: touched.confirmPassword ? 
      !formData.confirmPassword ? 'กรุณายืนยันรหัสผ่าน' :
      formData.password !== formData.confirmPassword ? 'รหัสผ่านไม่ตรงกัน' : ''
      : ''
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (Object.values(errors).every(error => !error)) {
      onSubmit({
        ...formData,
        profileImage: profileImage || undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-image"
          />
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <Upload size={16} />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">ชื่อ - นามสกุล</label>
        <input
          type="text"
          name="fullName"
          placeholder="Lilly vong"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={() => handleBlur('fullName')}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">อีเมล์</label>
        <input
          type="email"
          name="email"
          placeholder="Example@gmail.com"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">รหัสผ่าน</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="123456"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.password}
            onChange={handleInputChange}
            onBlur={() => handleBlur('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">ยืนยันรหัสผ่าน</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="123456"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={() => handleBlur('confirmPassword')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        ลงทะเบียน
      </button>

      <div className="text-center text-gray-500">หรือ</div>

      <button
        type="button"
        className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
      >
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_24dp.png"
          alt="Google"
          className="w-6 h-6 object-contain"
        />
        <span>เข้าสู่ระบบด้วย Google</span>
      </button>

      <p className="text-center text-sm text-gray-600">
        มีบัญชีอยู่แล้ว?{' '}
        <button type="button" onClick={onLoginClick} className="text-purple-600 hover:underline">
          เข้าสู่ระบบ
        </button>
      </p>
    </form>
  );
}