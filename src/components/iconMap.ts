import { BarChart, Calendar, Gamepad, GitHub, Globe, Trophy, Wallet } from './icons';

/** Icons the content file can refer to by name. */
export const ICONS = {
  globe: Globe,
  chart: BarChart,
  gamepad: Gamepad,
  calendar: Calendar,
  trophy: Trophy,
  wallet: Wallet,
  github: GitHub,
} as const;

export type IconName = keyof typeof ICONS;
