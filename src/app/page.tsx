import { Suspense } from "react";
import ClientPage from "./clientPage";

export default function Home() {
  return (
    <Suspense>
      <ClientPage />
    </Suspense>
  );
}
