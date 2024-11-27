"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  return (
    <div className="">
      <Button onClick={() => router.push("/intent")}>redirect</Button>
    </div>
  );
}

export default App;
