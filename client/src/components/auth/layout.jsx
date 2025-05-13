import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Left section with black background */}
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="text-center text-white space-y-6">
          {/* Centering the logo */}
          <img
            src="/logo.png"
            alt="SunTextiles Logo"
            className="h-[180px] w-auto mx-auto mb-6" // Logo centered
          />
          {/* Centering the welcome text */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome to SunTextiles ECommerce Shopping
          </h1>
        </div>
      </div>

      {/* Right section for the main content (Login, Signup, etc.) */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8 text-center">
          {/* Main content */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
