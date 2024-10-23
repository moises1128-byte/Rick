import AuthCard from "@/components/ui/AuthCard";
import Image from "next/image";
import Logo from "../assets/image/logoRick.png";

export default function Home() {
  return (
    <>
      {/* <header><WhiteNavbar close={true} /></header> */}
      <main>
        <div className="bg-white h-screen flex flex-col items-center justify-center	">
          {/* <h3 className="mt-6 text-[#595b5a] text-3xl font-bold leading-10 font-[family-name:var(--font-geist-mono)]">
            Créer un compte
          </h3> */}

          <Image alt="Rick-logo" src={Logo} style={{ width: "40vw" }} />
          <div className="mt-10 flex flex-col gap-y-10 w-full items-center">
            <AuthCard
              title={"Login"}
              description={`Réserver un rendez-vous près de chez vous`}
              type={"white"}
              path={`/auth/login`}
            />
            <AuthCard
              title={"Register"}
              description={`Développer et gérer votre entreprise`}
              type={"dark"}
              path={`/auth/register`}
            />
          </div>
        </div>
      </main>
    </>
  );
}
