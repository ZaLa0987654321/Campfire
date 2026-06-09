export const ToolType = {
    Axe: 0,
} as const;
export type ToolType = typeof ToolType[keyof typeof ToolType];