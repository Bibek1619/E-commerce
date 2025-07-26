import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  // Handle digit input
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle key navigation & backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current box
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move back and clear previous box
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" || e.key === " ") {
      e.preventDefault();
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  // Handle full OTP paste (like "1234")
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);

    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = pasted[i];
      }
    }
    setOtp(newOtp);

    if (pasted.length < 4) {
      inputsRef.current[pasted.length]?.focus();
    } else {
      inputsRef.current[3]?.blur(); // blur last input
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    console.log("Submitted OTP:", code);
    // Add verification logic here
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <h2 className="text-2xl font-semibold mb-4">Enter Verification Code</h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        We've sent a 4-digit code to your email. Please enter it below:
      </p>

      <div className="flex gap-3 w-full max-w-xs justify-center mb-4">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="text-center text-xl font-medium h-14 w-14 md:h-16 md:w-16 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-300 rounded-lg shadow-sm"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="mt-2 px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Verify
      </button>

      <button
        onClick={handleGoBack}
        className="mt-4 text-sm text-indigo-600 hover:underline flex items-center gap-1"
      >
        <ArrowLeft size={16} />
        Go Back
      </button>
    </div>
  );
};

export default Verification;
