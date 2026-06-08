import { State } from './State';
import { Game } from './main';

export abstract class Screen {
    protected state: State;
    protected onUpdate: () => void;
    protected game: Game;

    constructor(state: State, onUpdate: () => void, game: Game) {
        this.state = state;
        this.onUpdate = onUpdate;
        this.game = game;
    }

    public abstract render(): string;

    protected padLines(text: string, targetLength: number): string {
        return text
            .replace(/\r/g, "") // Очищаем от системных символов переноса
            .split("\n")        // Режем на массив отдельных строк
            .map(line => line.padEnd(targetLength, " ")) // Дописываем пробелы в конец каждой строки
            .join("\n");        // Склеиваем обратно в единый текстовый монолит
    }
}
