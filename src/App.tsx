import React from 'react';
import { Header } from './layouts/Header';
import { LoginPage } from './pages/Login';
import { Logo } from './components/common/Logo';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)),
            url('https://i.pinimg.com/736x/65/3e/78/653e780a595bf18a97b2270daa4cbcf9.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 gap-8">
          <Logo className="scale-150" />
          <LoginPage />
        </main>
      </div>
    </div>
  );
}

export default App;