"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
