import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ width: "100%", height: "100%" }}>
      <div>
        <h2>Il y avait un problème.</h2>
        <p>{`Nous n'avons pas trouvé la page que vous recherchiez.`}</p>
        <p>
          Retourne au <Link href={"/"}>Tableau de bord</Link>
        </p>
      </div>
    </main>
  );
}
