
const otpMap = new Map();

export const setOtp = (email, otp) => {
  otpMap.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000 
  });
};

export const verifyOtp = (email, userInputOtp) => {
  const record = otpMap.get(email);
  if (!record) return false;

  const isValid = record.otp === userInputOtp && Date.now() < record.expiresAt;
  if (isValid) otpMap.delete(email); // One-time use
  return isValid;
};
