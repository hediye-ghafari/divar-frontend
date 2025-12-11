import { useState } from "react";
import SendOtpForm from "components/templates/SendOtpForm";
import CheckOtpForm from "components/templates/CheckOtpForm";

function AuthPage() {
  const [step, setstep] = useState(1);
  const [mobile, setmobile] = useState("");
  const [code, setcode] = useState("");
  return (
    <div>
      {step === 1 && (
        <SendOtpForm setstep={setstep} mobile={mobile} setmobile={setmobile} />
      )}
      {step === 2 && (
        <CheckOtpForm
          code={code}
          setcode={setcode}
          mobile={mobile}
          setstep={setstep}
        />
      )}
    </div>
  );
}

export default AuthPage;
