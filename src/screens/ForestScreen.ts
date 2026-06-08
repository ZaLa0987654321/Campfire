import { Screen } from '../Screen';
import { State } from '../State';
import { AsciiButton } from '../AsciiButton';
import { CampScreen } from './CampScreen';
import treeArt from '../textures/tree.txt?raw';
import type { Game } from '../main';

export class ForestScreen extends Screen {
    constructor(state: State, onUpdate: () => void, game: Game) {
        super(state, onUpdate, game);
    }

    public render(): string {
        let out = "";

        out += `Экспедиция в тайгу. Текущий шаг: ${this.state.forestStep} из ${this.state.maxRadius}\n`;
        out += `Остаток жара костра на базе: ${this.state.fireTicks}%\n`;
        out += "==================================================\n\n";

        if (this.state.forestStep > 0) {
            out += treeArt + "\n\n";
            out += `Вы углубились в лес на ${this.state.forestStep} шагов. Становится холоднее...\n\n`;
        } else {
            out += "\n     Вы стоите на опушке леса. Впереди сплошные деревья...\n\n\n";
        }

        out += "==================================================\n\n";
        out += "Действия:\n";

        // Кнопка шага вперед
        if (this.state.forestStep < this.state.maxRadius && this.state.fireTicks > 0) {
            const stepBtn = new AsciiButton("Сделать шаг вперед", "step", () => {
                this.state.forestStep++;
                
                // ПОШАГОВАЯ ЛОГИКА: Костер догорает только от шагов!
                if (this.state.hasFire) {
                    this.state.fireTicks -= 5; // С каждым шагом костер на базе прогорает на 5%
                    if (this.state.fireTicks <= 0) {
                        this.state.fireTicks = 0;
                        this.state.hasFire = false;
                    }
                }
                
                this.onUpdate();
            });
            out += "  " + stepBtn.getHtml(this.game) + "\n";
        } else {
            if (this.state.fireTicks <= 0) {
                out += "  [ Костер на базе полностью ПОТУХ! Вы не можете идти дальше от холода ]\n";
            } else {
                out += "  [ Слишком холодно, чтобы идти дальше! Костер на базе слишком слаб ]\n";
            }
        }

        // Кнопка возврата в лагерь
        const backBtn = new AsciiButton("Вернуться к костру", "return", () => {
            // При возвращении создается новый CampScreen, который снова запустит реальное время
            this.game.changeScreen(new CampScreen(this.state, this.onUpdate, this.game));
        });
        out += "\n  " + backBtn.getHtml(this.game) + "\n";

        out = this.padLines(out, 100);

        let out2 = "";
        let tagOpened = false;
        for (let c = 0; c < out.length; c++) {
            let char = out[c];

            if (char == '<')
                tagOpened = true;
            else if (char == '>')
                tagOpened = false;

            if (Math.random() < (1.0 - this.state.fireTicks / 100)/24 && char == " " && !tagOpened)
                char = "*";
            out2 += char;
        }

        return out2;
    }
}
