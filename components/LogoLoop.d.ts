import { FC } from "react";

interface logoType {
  src: string;
  alt: string;
  href: string;
}

export interface LogoLoopProps {
  logos: logoType[];
  speed: number;
  direction: "left" | "right";
  logoHeight: number;
  gap: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
}

declare const LogoLoop: FC<LogoLoopProps>;
export default LogoLoop;
