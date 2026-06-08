import { Screen } from './Screen';

export class State {
    public wood: number = 0;
    public hasFire: boolean = false;
    public fireTicks: number = 100;
    
    public forestStep: number = 0;
    public maxRadius: number = 5;
    public currentScreen?: Screen; 

    // Флаги постоянного открытия интерфейса
    public unlockedFireRow: boolean = false;   
    public unlockedLightBtn: boolean = false;  
    public unlockedForestBtn: boolean = false; 

    // 1. Метод отвечает СТРОГО за расчет радиуса тепла
    public updateMaxRadius(): void {
        if (!this.hasFire) {
            this.maxRadius = 3;
        } else {
            this.maxRadius = Math.max(3, Math.floor(20 * (this.fireTicks / 100)));
        }
    }

    // 2. Метод отвечает СТРОГО за проверку новых открытий
    public checkUnlocks(): void {
        if (this.wood >= 30 || this.hasFire) {
            this.unlockedFireRow = true;
        }
        if (this.wood >= 30) {
            this.unlockedLightBtn = true;
        }
        if (this.hasFire && this.fireTicks > 40) {
            this.unlockedForestBtn = true;
        }
    }

    // 3. Главный метод обновления данных, который вызывается при любом изменении игры
    public updateAll(): void {
        this.updateMaxRadius();
        this.checkUnlocks();
    }
}
