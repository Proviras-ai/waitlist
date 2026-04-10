
import { DIM } from "../lib/constants";
export default function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: DIM, margin: "0 0 10px" }}>{children}</p>;
}