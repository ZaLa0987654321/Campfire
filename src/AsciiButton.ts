import { game } from './main';

export class AsciiButton {
    private text: string;
    private key: string; // Постоянный текстовый ключ кнопки
    private onClick: () => void;

    constructor(text: string, key: string, onClick: () => void) {
        this.text = text;
        this.key = key;
        this.onClick = onClick;
    }

    public getHtml(): string {
        // Регистрируем колбэк по фиксированному ключу
        game.registerButtonCallback(this.key, this.onClick);
        
        // Ключ всегда одинаковый, браузер не путается при обновлении кадров
        return `<button data-action-id="${this.key}">[ ${this.text} ]</button>`;
    }
}
