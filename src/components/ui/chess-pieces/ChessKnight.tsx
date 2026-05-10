import type { FC } from "react";
import type { PieceProps } from "./types";

export const ChessKnight: FC<PieceProps> = ({ size = 48, ...props }) => (
  <svg viewBox="0 0 45 45" width={size} height={size} fill="none" {...props}>
    <g fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
      <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" />
      <circle cx="16" cy="17.5" r="1.5" fill="rgba(0,0,0,0.4)" stroke="none" />
      <path d="M9 39h27v-3H9v3z" />
      <path d="M15.5 36c2.5-2.5 12.5-2.5 15 0" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
    </g>
  </svg>
);
