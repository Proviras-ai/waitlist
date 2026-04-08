import Field from "./Field";
import { BORDER_ACTIVE, BORDER, NAVY, DIM } from "../lib/constants";
const options=["Yes, actively in production", "Yes, in development / experimenting", "Evaluating for future use", "Just exploring for now"]

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function BuildingStatus({ value, onChange }: Props) {
  const toggle = (opt: string) =>
    onChange(opt);

  return (
    <Field label="Which frameworks do you use? (optional)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(opt => {
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
    </Field>
  );
}