import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";

import styles from "./CheckOtpForm.module.css";
function CheckOtpForm({ code, setcode, mobile, setstep }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobile, code);
    console.log({ response, error });
    if (response) {
      setCookie(response.data);
      queryClient.setQueryData(["profile"], { data: response.data });

      navigate("/");
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید.</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setcode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setstep(1)} className={styles.backbutton}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
