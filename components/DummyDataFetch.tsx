"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import React from "react";

export default function MyComponent({ children }: any) {
  const [data, setData] = useState<any>(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const handleClick = () => {
    id ? setData(id + 1) : setData(1);
    router.push(`${pathname}/?id=${data}`, { scroll: false });
  };
  return (
    <div>
      <button onClick={handleClick}>Home</button>
      {data ? children : <div></div>}
    </div>
  );
}
