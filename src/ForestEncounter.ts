import type { AsciiAnimation } from './AsciiAnimation';
import type { AsciiButton } from './AsciiButton';
import { game } from './main';

export abstract class ForestEncounter {
    public name: string;
    protected art: AsciiAnimation;
    protected buttons: AsciiButton[];

    constructor(name: string, art: AsciiAnimation, buttons: AsciiButton[]) {
        this.name = name;
        this.art = art;
        game.addAnimation(this.art);
        this.buttons = buttons;
    }

    public render(): string {
        const frame = this.art.getCurrentFrame();
        let lines = frame.replace("\r", "").split("\n");
        if (lines.length < 1 + this.buttons.length) {
            for (let i = 0; i < lines.length - (1 + this.buttons.length); i++) {
                lines.push("");
            }
        }

        const maxLength = Math.max(...lines.map(s => s.length));

        for (let b = 0; b < this.buttons.length; b++) {
            lines[b+1] = lines[b+1].padEnd(maxLength+4, " ") + this.buttons[b].getHtml();
        }

        return lines.join("\n");
    }
}
