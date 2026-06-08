export class AsciiAnimation {
    private animations: Map<string, string[]> = new Map();
    private currentAnimName: string = "idle";
    private currentFrameIndex: number = 0;
    private isPlayingOnce: boolean = false;
    private fallbackAnimName: string = "idle";

    constructor(rawText: string) {
        this.parseFile(rawText);
    }

    private parseFile(rawText: string): void {
        // Разбиваем весь текст на массив строк, очищая от символов \r
        const lines = rawText.replace(/\r/g, "").split("\n");
        
        let currentKey = "";
        let currentFrameLines: string[] = [];
        let allFramesForAnim: string[] = [];

        for (let line of lines) {
            // Ищем строку заголовка анимации
            if (line.startsWith("===ANIMATION:")) {
                // Если до этого мы уже собирали кадры для другой анимации — сохраняем последний кадр
                if (currentKey && currentFrameLines.length > 0) {
                    allFramesForAnim.push(currentFrameLines.join("\n"));
                    this.animations.set(currentKey, allFramesForAnim);
                }

                // Достаем имя анимации между ":" и "==="
                const namePart = line.split("===ANIMATION:")[1];
                currentKey = namePart.split("===")[0].trim();
                
                // Сбрасываем буферы для новой анимации
                currentFrameLines = [];
                allFramesForAnim = [];
                continue;
            }

            // Ищем разделитель кадров внутри текущей анимации
            if (line.trim() === "===") {
                if (currentFrameLines.length > 0) {
                    allFramesForAnim.push(currentFrameLines.join("\n"));
                    currentFrameLines = [];
                }
                continue;
            }

            // Если это обычная строка арта — добавляем её в текущий кадр
            if (currentKey) {
                currentFrameLines.push(line);
            }
        }

        // Не забываем сохранить самый последний кадр в самом конце файла
        if (currentKey && currentFrameLines.length > 0) {
            allFramesForAnim.push(currentFrameLines.join("\n"));
            this.animations.set(currentKey, allFramesForAnim);
        }
    }

    public tick(): void {
        const frames = this.animations.get(this.currentAnimName);
        if (!frames || frames.length <= 1) return;

        this.currentFrameIndex++;

        if (this.isPlayingOnce && this.currentFrameIndex >= frames.length) {
            this.isPlayingOnce = false;
            this.currentAnimName = this.fallbackAnimName;
            this.currentFrameIndex = 0;
        } else {
            this.currentFrameIndex = this.currentFrameIndex % frames.length;
        }
    }

    public playOnce(animName: string, fallbackAnimName: string = "idle"): void {
        if (!this.animations.has(animName)) {
            console.warn(`Анимация "${animName}" не найдена!`);
            return;
        }
        this.currentAnimName = animName;
        this.currentFrameIndex = 0;
        this.isPlayingOnce = true;
        this.fallbackAnimName = fallbackAnimName;
    }

    public changeLoop(animName: string): void {
        if (this.currentAnimName === animName) return;
        if (!this.animations.has(animName)) return;
        
        this.currentAnimName = animName;
        this.currentFrameIndex = 0;
        this.isPlayingOnce = false;
    }

    public getCurrentFrame(): string {
        const frames = this.animations.get(this.currentAnimName);
        // Если анимация не найдена, покажем технический лог для отладки
        if (!frames) {
            return `[ Ошибка: Анимация "${this.currentAnimName}" не найдена.\nДоступны: ${Array.from(this.animations.keys()).join(", ")} ]`;
        }
        return frames[this.currentFrameIndex] || "";
    }
}
