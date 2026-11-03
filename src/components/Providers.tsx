
"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : { type: "application/json" as const };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="studio-space-theme"
      scriptProps={scriptProps}
    >
      {children}
    </ThemeProvider>
  );
}
