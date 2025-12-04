import { FC } from "react";

export interface GradientTextProps {
  children: string;
  colors: string[];
  animationSpeed: number;
  showBorder: boolean;
}

declare const GradientText: FC<GradientTextProps>;
export default GradientText;
