import React from 'react'

import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function Error() {
  return (
    <div className="min-h-screen text-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-6">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-primary mb-3">
          Page Not Found
        </h2>
        
        <p className="text-primary mb-8">
          {`Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.`}
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2  bg-primary text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>


      </div>
    </div>
  )
}

