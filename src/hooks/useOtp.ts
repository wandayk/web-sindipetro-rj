"use client";

import { useState, useEffect } from "react";

const OTP_TIMER_DURATION = 300; // 5 minutos em segundos

export function useOtp() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(OTP_TIMER_DURATION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Countdown do timer
  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Formata o timer em MM:SS
  const formatTimer = (): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Simula envio do código OTP
  const sendOtp = async (): Promise<boolean> => {
    setLoading(true);
    setError("");

    // Simula latência de rede
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock: sempre sucesso
    console.log("📱 Código OTP enviado (mock)");
    setOtpSent(true);
    setTimer(OTP_TIMER_DURATION);
    setLoading(false);

    return true;
  };

  // Simula verificação do código OTP
  const verifyOtp = async (): Promise<boolean> => {
    setLoading(true);
    setError("");

    // Simula latência de rede
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock: aceita qualquer código de 6 dígitos
    if (otpValue.length === 6) {
      console.log("✅ Código OTP verificado (mock):", otpValue);
      setLoading(false);
      return true;
    } else {
      setError("Código inválido");
      setLoading(false);
      return false;
    }
  };

  // Reenvia o código OTP
  const resendOtp = async (): Promise<boolean> => {
    setOtpValue("");
    setError("");
    return sendOtp();
  };

  return {
    otpSent,
    otpValue,
    setOtpValue,
    timer,
    formatTimer,
    loading,
    error,
    sendOtp,
    verifyOtp,
    resendOtp,
    canResend: timer === 0,
  };
}
