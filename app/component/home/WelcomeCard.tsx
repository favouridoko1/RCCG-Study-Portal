"use client";

import { MdOutlineVerifiedUser } from "react-icons/md";

type WelcomeCardProps = {
  onSwitchAccount: (path: string) => void;
};

 function WelcomeCard({
  onSwitchAccount,
}: WelcomeCardProps) {
  return (
    <div className="h-fit rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-1">
        <span className="text-lg text-[#ffbd3d]">
          <MdOutlineVerifiedUser className="text-lg text-[#ffbd3d]" />
        </span>

        <h2 className="text-[20px] font-bold text-[#071c49]">
          Welcome Back
        </h2>
      </div>

      <p className="mt-2 text-[13px] leading-5 text-slate-600">
        Your session is secured with standard DRM protection. Access
        your library offline via the progressive web app.
      </p>

      <div className="mt-3 md:flex lg:flex-col">
        <button
          onClick={() => onSwitchAccount("/auth/login")}
          className="w-full cursor-pointer rounded-[9px] border-slate-300 py-2.5 text-xs font-bold text-[#071c49] hover:border hover:bg-slate-200"
        >
          Sign In as Different User
        </button>

        <button
          onClick={() => onSwitchAccount("/auth/signup")}
          className="w-full cursor-pointer rounded-[9px] border-slate-300 py-2.5 text-xs font-bold text-[#071c49] hover:border hover:bg-slate-200"
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default WelcomeCard;