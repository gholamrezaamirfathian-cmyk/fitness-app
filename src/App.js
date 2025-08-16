import React from 'react';
import { Button } from './components/Button';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">برنامه تمرینی و تغذیه بدنسازی</h1>
      <p className="text-lg mb-4 text-center">
        بهترین برنامه تمرینی، تغذیه، مکمل و داروهای ورزشی را دریافت کنید
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">برنامه تمرینی</h2>
          <p className="mb-4">هزینه: 100000 تومان</p>
          <Button>خرید</Button>
        </div>
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">برنامه تغذیه</h2>
          <p className="mb-4">هزینه: 100000 تومان</p>
          <Button>خرید</Button>
        </div>
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">مکمل ورزشی</h2>
          <p className="mb-4">هزینه: 100000 تومان</p>
          <Button>خرید</Button>
        </div>
        <div className="p-6 bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">برنامه دارویی (اختیاری)</h2>
          <p className="mb-4">هزینه: 100000 تومان</p>
          <Button>خرید</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
