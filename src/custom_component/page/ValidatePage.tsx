import { Link } from "react-router-dom";
import ValidateForm from "../form/ValidateForm";

export default function ValidatePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Custom Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center max-w-md relative">
            {/* Custom SVG Illustration for Validation */}
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
                  fill="#3b82f6"
                  opacity="0.1"
                />
                <circle cx="140" cy="140" r="80" fill="#1d4ed8" opacity="0.1" />

                {/* Mail/envelope */}
                <rect
                  x="90"
                  y="120"
                  width="100"
                  height="70"
                  rx="5"
                  fill="#f3f4f6"
                  stroke="#6b7280"
                  strokeWidth="2"
                />
                <polygon points="90,120 140,155 190,120" fill="#3b82f6" />
                <line
                  x1="90"
                  y1="120"
                  x2="140"
                  y2="155"
                  stroke="#1d4ed8"
                  strokeWidth="2"
                />
                <line
                  x1="190"
                  y1="120"
                  x2="140"
                  y2="155"
                  stroke="#1d4ed8"
                  strokeWidth="2"
                />

                {/* Security shield */}
                <path
                  d="M140 90 L155 100 L155 125 L140 140 L125 125 L125 100 Z"
                  fill="#10b981"
                />
                <path
                  d="M135 115 L140 120 L150 105"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Code numbers floating */}
                <g
                  fill="#6366f1"
                  fontSize="16"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  <text x="60" y="80" opacity="0.7">
                    1
                  </text>
                  <text x="220" y="70" opacity="0.6">
                    2
                  </text>
                  <text x="50" y="220" opacity="0.8">
                    3
                  </text>
                  <text x="230" y="210" opacity="0.5">
                    4
                  </text>
                  <text x="70" y="250" opacity="0.7">
                    5
                  </text>
                  <text x="210" y="240" opacity="0.6">
                    6
                  </text>
                </g>

                {/* Decorative elements */}
                <circle cx="80" cy="100" r="4" fill="#fbbf24" opacity="0.8" />
                <circle cx="200" cy="90" r="5" fill="#f59e0b" opacity="0.7" />
                <circle cx="70" cy="200" r="3" fill="#84cc16" opacity="0.9" />
                <circle cx="210" cy="190" r="4" fill="#65a30d" opacity="0.6" />

                {/* Signal waves */}
                <g stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.5">
                  <circle cx="140" cy="140" r="50" />
                  <circle cx="140" cy="140" r="65" opacity="0.3" />
                  <circle cx="140" cy="140" r="80" opacity="0.2" />
                </g>
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-blue-800">
              Almost there!
            </h2>
            <p className="text-blue-700 leading-relaxed">
              We've sent a verification code to your email. Please check your
              inbox and enter the code to continue.
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lovebirds</h1>
            <h2 className="text-xl text-gray-600 mb-8">Verify your account</h2>
          </div>

          <ValidateForm />

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?{" "}
              <button className="font-medium text-emerald-600 hover:text-emerald-500">
                Resend code
              </button>
            </p>

            <p className="text-sm text-gray-600">
              <Link
                to="/login"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
