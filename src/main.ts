import { State } from './State';
import { CampScreen } from './screens/CampScreen';
import { AsciiAnimation } from './AsciiAnimation';
import type { ForestEncounter } from './ForestEncounter';
import type { ResourceEncounter } from './ResourceEncounter';

export let game: Game;
type EncounterConstructor = new () => ResourceEncounter;

export class Game {
    private state: State;
    private terminalContainer: HTMLDivElement;
    private activeAnimations: AsciiAnimation[] = [];
    private buttonRegistry: Map<string, () => void> = new Map();
    private forestEncountersRegistry: EncounterConstructor[] = [];
    
    // Храним массив HTML-элементов строк, которые сейчас на экране
    private domLines: HTMLPreElement[] = [];

    constructor() {
        game = this;
        this.state = new State();
        this.terminalContainer = document.getElementById('game-terminal') as HTMLDivElement;
        this.state.currentScreen = new CampScreen(this.state, () => this.update());

        const modules = import.meta.glob("./forest/*/*.ts", { eager: true });
        for (const path in modules) {
            const module = modules[path] as any;
            const exportedItem = Object.values(module as object)[0];
            this.forestEncountersRegistry.push(exportedItem);
        }

        console.log(this.forestEncountersRegistry);

        this.initClickListener();
        this.initTimers();
        this.update();
    }

    public getRandomForestEncounter(): ForestEncounter {
        return new this.forestEncountersRegistry[Math.floor(Math.random() * this.forestEncountersRegistry.length)]();
    }

    public registerButtonCallback(key: string, callback: () => void): void {
        this.buttonRegistry.set(key, callback);
    }

    public clearButtonRegistry(): void {
        this.buttonRegistry.clear();
    }

    private initClickListener(): void {
        // mousedown ловит нажатие мгновенно
        this.terminalContainer.addEventListener('mousedown', (e) => {
            const target = e.target as HTMLElement;
            const actionId = target.getAttribute('data-action-id');
            
            if (actionId) {
                e.preventDefault();
                const callback = this.buttonRegistry.get(actionId);
                if (callback) {
                    callback();
                }
            }
        });
    }

    public addAnimation(anim: AsciiAnimation): void {
        if (!this.activeAnimations.includes(anim)) this.activeAnimations.push(anim);
    }

    public removeAnimation(anim: AsciiAnimation): void {
        this.activeAnimations = this.activeAnimations.filter(a => a !== anim);
    }

    public clearAllAnimations(): void {
        this.activeAnimations = [];
    }

    public update(): void {
        this.state.updateAll();
        
        if (this.state.currentScreen) {
            // Очищаем реестр кнопок перед каждым рендером, они зарегистрируются заново
            this.clearButtonRegistry();

            // Получаем сплошной текст экрана и режем его на массив строк
            const rawRender = this.state.currentScreen.render();
            const newLines = rawRender.replace(/\r/g, "").split("\n");

            // Подгоняем количество HTML-строк в контейнере под новый размер текста
            while (this.domLines.length < newLines.length) {
                const pre = document.createElement("pre");
                pre.className = "terminal-line";
                this.terminalContainer.appendChild(pre);
                this.domLines.push(pre);
            }
            while (this.domLines.length > newLines.length) {
                const pre = this.domLines.pop();
                if (pre) this.terminalContainer.removeChild(pre);
            }

            // УМНОЕ ПОСТРОЧНОЕ ОБНОВЛЕНИЕ
            for (let i = 0; i < newLines.length; i++) {
                const newHtml = newLines[i];
                const lineElement = this.domLines[i];

                // Сравниваем HTML-содержимое. Если строка не изменилась — вообще не трогаем её!
                if (lineElement.innerHTML !== newHtml) {
                    lineElement.innerHTML = newHtml;
                }
            }
        }
    }

    public changeScreen(nextScreen: any): void {
        // При смене экрана полностью вычищаем старые HTML-строки
        this.terminalContainer.innerHTML = "";
        this.domLines = [];
        
        this.state.currentScreen = nextScreen;
        this.update();
    }

    private initTimers(): void {
        setInterval(() => {
            if (this.activeAnimations.length > 0) {
                this.activeAnimations.forEach(anim => anim.tick());
                this.update(); 
            }
        }, 500);
    }
}

new Game();
