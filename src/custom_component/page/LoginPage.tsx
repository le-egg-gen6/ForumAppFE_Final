import { Link } from "react-router-dom";
import { LoginForm } from "../form/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Custom Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md relative">
            {/* Custom SVG Illustration */}
            <div className="mb-8 relative">
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circles */}
                <circle
                  cx="140"
                  cy="140"
                  r="120"
                  fill="#10b981"
                  opacity="0.1"
                />
                <circle cx="140" cy="140" r="80" fill="#059669" opacity="0.1" />

                {/* Bird body */}
                <ellipse cx="140" cy="160" rx="35" ry="45" fill="#f97316" />

                {/* Bird head */}
                <circle cx="140" cy="120" r="25" fill="#ea580c" />

                {/* Beak */}
                <polygon points="155,115 170,120 155,125" fill="#fbbf24" />

                {/* Eye */}
                <circle cx="145" cy="115" r="4" fill="white" />
                <circle cx="147" cy="113" r="2" fill="black" />

                {/* Wing */}
                <ellipse
                  cx="125"
                  cy="150"
                  rx="15"
                  ry="25"
                  fill="#dc2626"
                  transform="rotate(-20 125 150)"
                />

                {/* Flowers around */}
                <g>
                  <circle cx="80" cy="100" r="8" fill="#ec4899" />
                  <circle cx="75" cy="95" r="6" fill="#f472b6" />
                  <circle cx="85" cy="95" r="6" fill="#f472b6" />
                  <circle cx="75" cy="105" r="6" fill="#f472b6" />
                  <circle cx="85" cy="105" r="6" fill="#f472b6" />
                </g>

                <g>
                  <circle cx="200" cy="80" r="10" fill="#8b5cf6" />
                  <circle cx="195" cy="75" r="7" fill="#a78bfa" />
                  <circle cx="205" cy="75" r="7" fill="#a78bfa" />
                  <circle cx="195" cy="85" r="7" fill="#a78bfa" />
                  <circle cx="205" cy="85" r="7" fill="#a78bfa" />
                </g>

                {/* Leaves */}
                <ellipse
                  cx="60"
                  cy="180"
                  rx="8"
                  ry="20"
                  fill="#22c55e"
                  transform="rotate(45 60 180)"
                />
                <ellipse
                  cx="220"
                  cy="200"
                  rx="10"
                  ry="25"
                  fill="#16a34a"
                  transform="rotate(-30 220 200)"
                />
                <ellipse
                  cx="100"
                  cy="220"
                  rx="6"
                  ry="15"
                  fill="#15803d"
                  transform="rotate(60 100 220)"
                />

                {/* Small decorative elements */}
                <circle cx="90" cy="60" r="3" fill="#fbbf24" />
                <circle cx="190" cy="50" r="4" fill="#f59e0b" />
                <circle cx="70" cy="240" r="2" fill="#84cc16" />
                <circle cx="210" cy="230" r="3" fill="#65a30d" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-emerald-800">
              Welcome to Lovebirds
            </h2>
            <p className="text-emerald-700 leading-relaxed">
              Discover amazing connections and share beautiful moments with our
              vibrant community.
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lovebirds</h1>
            <h2 className="text-xl text-gray-600 mb-8">Welcome to Lovebirds</h2>
          </div>

          <LoginForm />

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
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
