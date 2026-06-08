import { Game } from './main';

export abstract class ForestEncounter {
    public name: string;
    protected rawArt: string;

    constructor(name: string, rawArt: string) {
        this.name = name;
        this.rawArt = rawArt;
    }

    public getArtLines(): string[] {
        return this.rawArt.replace(/\r/g, "").split("\n");
    }

    public abstract renderControls(game: Game, onUpdate: () => void): string[];
}
