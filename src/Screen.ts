import { State } from './State';

export abstract class Screen {
    protected state: State;
    protected onUpdate: () => void;

    constructor(state: State, onUpdate: () => void) {
        this.state = state;
        this.onUpdate = onUpdate;
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
