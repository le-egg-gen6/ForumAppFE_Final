import { Link } from "react-router-dom"
import RegisterForm from "../form/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lovebirds</h1>
            <h2 className="text-xl text-gray-600 mb-8">Create your account</h2>
          </div>

          <RegisterForm />

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Custom Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md relative">
            {/* Custom SVG Illustration for Register */}
            <div className="mb-8 relative">
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circles */}
                <circle cx="140" cy="140" r="120" fill="#ec4899" opacity="0.1" />
                <circle cx="140" cy="140" r="80" fill="#be185d" opacity="0.1" />

                {/* Two birds for community */}
                {/* First bird */}
                <ellipse cx="120" cy="140" rx="25" ry="35" fill="#f59e0b" />
                <circle cx="120" cy="115" r="18" fill="#d97706" />
                <polygon points="130,110 140,115 130,120" fill="#fbbf24" />
                <circle cx="125" cy="110" r="3" fill="white" />
                <circle cx="126" cy="109" r="1.5" fill="black" />

                {/* Second bird */}
                <ellipse cx="160" cy="160" rx="25" ry="35" fill="#8b5cf6" />
                <circle cx="160" cy="135" r="18" fill="#7c3aed" />
                <polygon points="170,130 180,135 170,140" fill="#fbbf24" />
                <circle cx="165" cy="130" r="3" fill="white" />
                <circle cx="166" cy="129" r="1.5" fill="black" />

                {/* Heart between birds */}
                <path
                  d="M140 150 C135 145, 125 145, 125 155 C125 165, 140 175, 140 175 C140 175, 155 165, 155 155 C155 145, 145 145, 140 150 Z"
                  fill="#ef4444"
                />

                {/* Flowers */}
                <g>
                  <circle cx="70" cy="90" r="10" fill="#f472b6" />
                  <circle cx="65" cy="85" r="7" fill="#fbbf24" />
                  <circle cx="75" cy="85" r="7" fill="#fbbf24" />
                  <circle cx="65" cy="95" r="7" fill="#fbbf24" />
                  <circle cx="75" cy="95" r="7" fill="#fbbf24" />
                </g>

                <g>
                  <circle cx="210" cy="100" r="12" fill="#a78bfa" />
                  <circle cx="205" cy="95" r="8" fill="#fbbf24" />
                  <circle cx="215" cy="95" r="8" fill="#fbbf24" />
                  <circle cx="205" cy="105" r="8" fill="#fbbf24" />
                  <circle cx="215" cy="105" r="8" fill="#fbbf24" />
                </g>

                {/* Leaves and branches */}
                <ellipse cx="50" cy="200" rx="10" ry="25" fill="#22c55e" transform="rotate(30 50 200)" />
                <ellipse cx="230" cy="180" rx="12" ry="30" fill="#16a34a" transform="rotate(-45 230 180)" />
                <ellipse cx="90" cy="240" rx="8" ry="20" fill="#15803d" transform="rotate(75 90 240)" />

                {/* Sparkles */}
                <g fill="#fbbf24">
                  <polygon points="80,50 82,58 90,60 82,62 80,70 78,62 70,60 78,58" />
                  <polygon points="200,40 201,46 207,47 201,48 200,54 199,48 193,47 199,46" />
                  <polygon points="60,220 61,225 66,226 61,227 60,232 59,227 54,226 59,225" />
                </g>
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-pink-800">Join our community</h2>
            <p className="text-pink-700 leading-relaxed">
              Start your journey with us and connect with amazing people who share your interests.
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-200 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
