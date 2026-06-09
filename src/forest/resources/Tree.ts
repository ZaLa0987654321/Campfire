import { AsciiAnimation } from "../../AsciiAnimation";
import { ResourceEncounter } from "../../ResourceEncounter";
import { ToolType } from "../../ToolType";
import treeArt from '../../textures/tree.txt?raw';

export class Tree extends ResourceEncounter {
    constructor() {
        super("Tree", new AsciiAnimation(treeArt), ToolType.Axe, "Рубить дерево", () => {

        });
    }
}