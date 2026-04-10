"use client";
import Label from "./Label";
import { useState } from "react";
import { BORDER, BORDER_ACTIVE, NAVY } from "../lib/constants";

type TextInputProps = {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
};

function TextInput({ placeholder, value, onChange, type = "text" }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "12px 16px", fontSize: 15,
        background: "rgba(0,11,61,0.03)",
        border: `1px solid ${focused ? BORDER_ACTIVE : BORDER}`,
        borderRadius: 8, color: NAVY, outline: "none",
        boxSizing: "border-box" as const, transition: "border-color 0.15s",
      }}
    />
  );
}

type Props = {
  name: string;
  email: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  errors: { name?: string; email?: string };
  isMobile: boolean;
};

export default function NameEmailFields({ name, email, onNameChange, onEmailChange, errors, isMobile }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
      <div>

        <Label>full_name</Label>
        <TextInput placeholder="John Doe" value={name} onChange={onNameChange} />
        {errors.name && <span style={{ fontSize: 12, color: "#c0392b", marginTop: 5 }}>{errors.name}</span>}
      </div>
      <div>
        <Label>work_email</Label>
        <TextInput type="email" placeholder="john@doe.com" value={email} onChange={onEmailChange} />
        {errors.email && <span style={{ fontSize: 12, color: "#c0392b", marginTop: 5 }}>{errors.email}</span>}
      </div>
    </div>
  );
}