"use client";

import { DIM } from "../lib/constants";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function Field({ label, children }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: DIM, marginBottom: 8, display: "block", letterSpacing: "0.02em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}