import { Screen } from '../Screen';
import { State } from '../State';
import { AsciiButton } from '../AsciiButton';
import { ForestScreen } from './ForestScreen';
import fireArt from '../textures/campfire.txt?raw';
import { AsciiAnimation } from '../AsciiAnimation';
import { game } from '../main';

export class CampScreen extends Screen {
    private timerId: any = null;
    private fireAnimation: AsciiAnimation;

    constructor(state: State, onUpdate: () => void) {
        super(state, onUpdate);
        this.startCampTimer();

        this.fireAnimation = new AsciiAnimation(fireArt);

        game.addAnimation(this.fireAnimation);
    }

    private startCampTimer(): void {
        this.timerId = setInterval(() => {
            if (this.state.hasFire) {
                this.state.fireTicks -= 1;
                if (this.state.fireTicks <= 0) {
                    this.state.hasFire = false;
                    this.state.fireTicks = 0;
                }
                this.onUpdate();
            }
        }, 1000);
    }

    private stopCampTimer(): void {
        if (this.timerId != null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    public render(): string {
        let out = "";

        // === 1. ВЕРХНЯЯ ПАНЕЛЬ ===
        out += `Древесина: ${this.state.wood}\n`;
         
        // Если строка костра была открыта хоть раз — она не исчезает
        if (this.state.unlockedFireRow) {
            out += `Костер:    ${this.state.hasFire ? this.state.getFirePercent() + '%' : 'не зажжен'}\n`;
        }
        
        out += "==================================================\n\n";

        // === 2. ASCII ГРАФИКА ===
        if (!this.state.hasFire) {
            out += "     [ ПОЛНАЯ ТЕМНОТА ]\n     Вокруг лишь холодный мрак...\n\n";
        } else {
            out += this.fireAnimation.getCurrentFrame() + "\n\n";
        }

        out += "==================================================\n\n";
        out += "Действия:\n";

        // === 3. КНОПКИ ДЕЙСТВИЙ ===
        
        // Кнопка сбора веток (всегда активна)
        const gatherBtn = new AsciiButton("Собрать ветки", "gather", () => {
            this.state.wood++;
            this.onUpdate();
        });
        out += "  " + gatherBtn.getHtml() + "\n";

        // Кнопка розжига костра
        if (this.state.unlockedLightBtn) {
            if (!this.state.hasFire) {
                if (this.state.wood >= 30) {
                    const lightBtn = new AsciiButton("Разжечь костер (30 дерева)", "light", () => {
                        this.state.wood -= 30;
                        this.state.hasFire = true;
                        this.state.fireTicks = this.state.maxFireTicks;
                        this.onUpdate();
                    });
                    out += "  " + lightBtn.getHtml() + "\n";
                } else {
                    // Если дерева не хватает, кнопка не исчезает, а блокируется текстиком
                    out += "  [ Разжечь костер (Нужно 30 дерева) ]\n";
                }
            }
        }

        // Кнопка подкидывания дерева
        if (this.state.hasFire) {
            if (this.state.wood > 0) {
                const fuelBtn = new AsciiButton("Подкинуть 1 дерево", "fuel", () => {
                    this.state.wood--;
                    this.state.fireTicks = Math.min(this.state.fireTicks + 25, this.state.maxFireTicks);
                    this.onUpdate();
                    this.fireAnimation.playOnce("flash");
                });
                out += "  " + fuelBtn.getHtml() + "\n";
            } else {
                // Если костер горит, но веток нет — кнопка заблокирована
                out += "  [ Нет дерева ]\n";
            }
        }

        // Кнопка похода в лес
        if (this.state.unlockedForestBtn) {
            if (this.state.hasFire && this.state.fireTicks > 0) {
                const goForestBtn = new AsciiButton("Идти в глубь леса", "to_forest", () => {
                    this.stopCampTimer();
                    this.state.forestStep = 0;
                    game.changeScreen(new ForestScreen(this.state, this.onUpdate));
                });
                out += "\n  " + goForestBtn.getHtml() + "\n";
            } else {
                // Если костер потух, тропинка в лес видна, но пойти нельзя из-за холода
                out += "\n  [ Идти в глубь леса (Слишком холодно) ]\n";
            }
        }

        return out;
    }
}
