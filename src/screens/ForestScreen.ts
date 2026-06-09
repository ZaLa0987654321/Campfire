import { Screen } from '../Screen';
import { State } from '../State';
import { AsciiButton } from '../AsciiButton';
import { CampScreen } from './CampScreen';
import { game } from '../main';
import type { ForestEncounter } from '../ForestEncounter';

export class ForestScreen extends Screen {
    protected currentEncounter: ForestEncounter = game.getRandomForestEncounter();
    
    constructor(state: State, onUpdate: () => void) {
        super(state, onUpdate);
    }

    public render(): string {
        let out = "";

        out += `Экспедиция в тайгу. Текущий шаг: ${this.state.forestStep}\n`;
        out += `Остаток жара костра на базе: ${this.state.getFirePercent()}%\n`;
        out += "==================================================\n\n";

        if (this.state.forestStep > 0 && this.currentEncounter) {
            out += this.currentEncounter.render() + "\n\n";
            out += `Становится холоднее...\n\n`;
        } else {
            out += "\n     Вы стоите на опушке леса...\n\n\n";
        }

        out += "==================================================\n\n";
        out += "Действия:\n";

        // Кнопка шага вперед
        if (this.state.fireTicks > 0) {
            const stepBtn = new AsciiButton("Сделать шаг вперед", "step", () => {
                this.state.forestStep++;
                
                // ПОШАГОВАЯ ЛОГИКА: Костер догорает только от шагов!
                if (this.state.hasFire) {
                    this.state.fireTicks -= 50; // С каждым шагом костер на базе прогорает на 5%
                    if (this.state.fireTicks <= 0) {
                        this.state.fireTicks = 0;
                        this.state.hasFire = false;
                    }
                }
                
                this.onUpdate();
            });
            out += "  " + stepBtn.getHtml() + "\n";
        } else {
            out += "  [ Слишком холодно, чтобы идти дальше! ]\n";
        }

        // Кнопка возврата в лагерь
        const backBtn = new AsciiButton("Вернуться к костру", "return", () => {
            // При возвращении создается новый CampScreen, который снова запустит реальное время
            game.changeScreen(new CampScreen(this.state, this.onUpdate));
        });
        out += "\n  " + backBtn.getHtml() + "\n";

        out = this.padLines(out, 100);

        let out2 = "";
        let tagOpened = false;
        for (let c = 0; c < out.length; c++) {
            let char = out[c];

            if (char == '<')
                tagOpened = true;
            else if (char == '>')
                tagOpened = false;

            if (Math.random() < (1.0 - this.state.fireTicks / 100)/32 && char == " " && !tagOpened)
                char = "*";
            out2 += char;
        }

        return out2;
    }
}
