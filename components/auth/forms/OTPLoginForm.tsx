"use client";

import { useState } from "react";

import SendOTPLogin from "./SendOTPLogin";
import VerifyOTPLogin from "./VerifyOTPLogin";

function OTPLoginForm() {
	const [email, setEmail] = useState("");
	const [step, setStep] = useState<"send-otp" | "verify-otp">("send-otp");

	const handleOnOTPSent = (email: string) => {
		setEmail(email);
		setStep("verify-otp");
	};

	const handleOnEdit = () => {
		setStep("send-otp");
		setEmail("");
	};

	return (
		<div>
			{step === "send-otp" && (
				<SendOTPLogin onSuccess={handleOnOTPSent} />
			)}

			{step === "verify-otp" && email && (
				<VerifyOTPLogin email={email} onEdit={handleOnEdit} />
			)}
		</div>
	);
}

export default OTPLoginForm;
