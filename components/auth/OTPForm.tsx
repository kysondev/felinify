"use client";
import { verifyOTP } from "actions/auth.action";
import { Loading } from "components/ui/loading";
import Form from "next/form";
import { useEffect, useRef, useState, useTransition } from "react";

interface OTPFormProps {
  onCancel: () => void;
}

const OTPForm = ({ onCancel }: OTPFormProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isPending, startTransition] = useTransition();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[0-9]*$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastFilledIndex = newOtp.findLastIndex((x) => x !== "");
    const focusIndex = lastFilledIndex === 5 ? 5 : lastFilledIndex + 1;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full">
      <p className="text-sm mb-5 text-gray-300">
        Please enter the 6-digit verification code sent to your email.
      </p>

      <Form
        action={async () => {
          startTransition(async () => {
            await verifyOTP(otp);
          });
        }}
        className="space-y-5"
      >
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-12 text-center text-lg bg-[#232323] border border-[#333333] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
              required
            />
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending || otp.join("").length !== 6}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loading />
              </span>
            ) : (
              "Verify Code"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-[#232323] hover:bg-[#282828] text-white text-sm rounded-sm border border-[#333333] transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default OTPForm;
