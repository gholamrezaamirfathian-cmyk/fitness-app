import React from 'react';

export function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition">
      {children}
    </button>
  );
}
