import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Verification = ({ onVerify }) => {
  const Navigate = useNavigate();
  const CODE_LENGTH = 4;
  const [code, setCode] = useState(new Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === CODE_LENGTH) {
      onVerify?.(fullCode); // Call parent callback
    } else {
      alert("Please enter the full verification code.");
    }
  };
  const handleBack=()=>{
    Navigate(-1);
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="w-10 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer"
        >
          Verify
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Enter the verification code sent to your email or phone.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Didn't receive the code? <a href="#" className="text-blue-600 hover:underline">Resend Code</a>
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
      </p>
      <p className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer " onClick={handleBack}>Go Back  </p>



    </div>
  );
};

export default Verification;
