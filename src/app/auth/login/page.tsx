import React from "react";
import AuthCard from "@/components/ui/AuthCard";

const Login = () => {
  return (
    <main className="bg-white flex w-screen	h-screen justify-center items-center">
      <div className="w-fit flex flex-col items-start p-6 gap-6 bg-white rounded-2xl border border-gray-800 border-opacity-20 shadow-sm	">
        <h3 className="mt-6 text-gray-700 text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
          Login
        </h3>
        <div className="mt-10 flex flex-col gap-y-10 w-full items-center">
          <AuthCard
            title={"En tant que particulier"}
            description={`Réserver un rendez-vous près de chez vous`}
            type={"white"}
            path={`/auth/register/client`}
          />
          <AuthCard
            title={"En tant que professionnel"}
            description={`Développer et gérer votre entreprise`}
            type={"dark"}
            path={`/auth/register/prestataire`}
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
