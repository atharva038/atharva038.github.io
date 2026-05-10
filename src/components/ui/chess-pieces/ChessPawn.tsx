import type { FC } from "react";
import type { PieceProps } from "./types";

export const ChessPawn: FC<PieceProps> = ({ size = 48, ...props }) => (
  <svg viewBox="0 0 45 45" width={size} height={size} fill="none" {...props}>
    <g fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03C15 27.09 12.5 29.02 12.5 33.5h20c0-4.48-2.5-6.41-5.91-7.47C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
      <path d="M9 39h27v-3H9v3z" />
      <path d="M12.5 33.5h20" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
    </g>
  </svg>
);
