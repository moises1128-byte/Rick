"use client";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();
  return (
    <main className=" flex w-full	h-screen justify-center items-center">
      <div className="w-2/4	flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-[#00B5CC] text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          User Dashboard
        </h3>

        <div className="flex flex-col justify-center items-center w-full gap-5 h-2/4">
          <div className="flex gap-5 w-full  ">
            <div
              onClick={() => router.push("/user/consultation-character")}
              className="hover-conatiner"
            >
              List of Characters
            </div>
            <div
              onClick={() => router.push("/user/consultation-episodes")}
              className="hover-conatiner"
            >
              List of Episodes
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div
              onClick={() => router.push("/user/character-creation")}
              className="hover-conatiner"
            >
              Character Creation
            </div>
            <div onClick={() => router.push("/")} className="hover-conatiner">
              Logout
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
