import type { AsciiAnimation } from "./AsciiAnimation";
import { AsciiButton } from "./AsciiButton";
import { ForestEncounter } from "./ForestEncounter";
import { ToolType } from "./ToolType";

export abstract class ResourceEncounter extends ForestEncounter {
    protected requiredTool: ToolType;

    constructor(name: string, art: AsciiAnimation, requiredTool: ToolType, miningButtonText: string, onClick: () => void) {
        super(name, art, [new AsciiButton(miningButtonText, "mining", onClick)]);
        this.requiredTool = requiredTool;
    }
}