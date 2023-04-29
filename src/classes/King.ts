import { stats } from "../stats/bossStats";
import { Boss } from "./Boss";
import { Player } from "./Player";
import { Sword } from "./Sword";

export class King extends Boss {
    public swords: Sword[] = [];
    private swordTimer = 0;
    public name: string = 'king';

    constructor (
        stage: string,
        x: number,
        y: number,
        orientation: 'left' | 'right'
    ) {
        super(stats.stage_1, stage, x, y, orientation);
    }

    createSword(player: Player) {
        const coefSide = Math.random() * 4;
        const side = coefSide < 1 ? 'top' : coefSide < 2 ? 'right' : coefSide < 3 ? 'bottom' : 'left';

        if (side === 'top') {
            const x = Math.random() * 3858;
            const y = 0;
            let angle = Math.atan((player.y + 40 - y) / (player.x + 40 - x));
            if (x > 1929) {
                angle += Math.PI;
            }
            return new Sword(x, y, angle, this.damage);
        } else if (side === 'right') {
            const x = 3858;
            const y = Math.random() * 3951;
            let angle = Math.atan((player.y + 40 - y) / (player.x + 40 - x)) + Math.PI;
            return new Sword(x, y, angle, this.damage);
        } else if (side === 'bottom') {
            const x = Math.random() * 3858;
            const y = 3951;
            let angle = Math.atan((player.y + 40 - y) / (player.x + 40 - x));
            if (x > 1929) {
                angle += Math.PI;
            }
            return new Sword(x, y, angle, this.damage);
        } else {
            const x = 0;
            const y = Math.random() * 3951;
            let angle = Math.atan((player.y + 40 - y) / (player.x + 40 - x));
            return new Sword(x, y, angle, this.damage);
        }
    };

    spawnSword(player: Player) {
        if (this.swordTimer > 0) {
            this.swordTimer--;
        } else {
            this.swords.push(this.createSword(player));
            if (this.health > 2000) {
                this.swordTimer = 50;
            } else if (this.health > 1000) {
                this.swordTimer = 40;
            } else {
                this.swordTimer = 30;
            }
        }
    }

    moveSwords(player: Player) {
        this.swords.map(sword => sword.move(player))
    }
}