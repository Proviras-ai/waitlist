import { BORDER_ACTIVE, BORDER, NAVY, DIM } from "@/app/lib/constants";
import Label from "./Label";

const options: ("Human" | "Agent")[] = ["Human", "Agent"];

type Props = {
  value: "Agent" | "Human";
  onChange: (val: "Agent" | "Human") => void;
};

export default function AgentOrHuman({ value, onChange }: Props) {
  const toggle = (opt: "Agent" | "Human") => onChange(opt);

  return (
    <div>
      <Label>you_are</Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => {
          const sel = value === opt;

          return (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
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