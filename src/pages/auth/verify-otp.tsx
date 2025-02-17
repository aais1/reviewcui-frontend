import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTime, setResendTime] = useState(30);

  // Function to handle OTP input
  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value !== '' && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  // Function to handle Resend OTP
  const handleResendOTP = () => {
    setResendTime(30);
    // Simulate OTP resend logic here
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-6">Verify OTP</h1>

      <div className="bg-white w-xl md:w-2xl p-8 flex-col items-center justify-center shadow-lg rounded-lg">
        <p className="text-gray-600 text-center mb-4">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg mt-6 transition">
          Verify OTP
        </button>

        {/* Resend OTP */}
        <p className="text-center text-gray-600 mt-4">
          Didn’t receive the code?{' '}
          {resendTime > 0 ? (
            <span className="text-gray-500">Resend in {resendTime}s</span>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-blue-500 hover:underline font-semibold"
            >
              Resend OTP
            </button>
          )}
        </p>

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-4">
          <Link
            to="/auth/sign-in"
            className="text-blue-500 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
