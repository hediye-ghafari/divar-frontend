import api from "configs/api";

const sendOtp = async (mobile) => {
  try {
    const response = await api.post("auth/send-otp", { mobile });
    return { response };
  } catch (error) {
    return { error };
  }
};

const checkOtp = async (mobile, code) => {
  try {
    const response = await api.post("auth/check-otp", { mobile, code });
    return { response };
  } catch (error) {
    return { error };
  }
};

const logout = async () => {
  try {
    document.cookie = "accessToken=; max-age=0";
    document.cookie = "refreshToken=; max-age=0";

    return true;
  } catch (error) {
    console.log("Logout error:", error);
    return false;
  }
};
export { sendOtp, checkOtp, logout };
