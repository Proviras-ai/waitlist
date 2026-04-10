/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { BORDER, BORDER_ACTIVE, NAVY, DIM } from "../lib/constants";
import Label from "./Label";

const FRAMEWORKS = ["LangChain", "CrewAI", "AutoGen", "LlamaIndex", "Agno", "Haystack", "Custom / Other"];

type Props = {
  value: string[];
  onChange: (val: string[]) => void;
};

export default function ModelTypes({ value, onChange }: Props) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);

  return (
    <div>
      <Label>frameworks <span style={{ fontWeight: 400, opacity: 0.5 }}>// optional</span></Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {FRAMEWORKS.map(opt => {
          const sel = value.includes(opt);
          return (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                padding: "8px 14px", borderRadius: 6, cursor: "pointer",
                fontSize: 13, fontWeight: 500, transition: "all 0.15s",
                background: sel ? "rgba(0,11,61,0.08)" : "rgba(0,11,61,0.03)",
                border: `1px solid ${sel ? BORDER_ACTIVE : BORDER}`,
                color: sel ? NAVY : DIM,
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}