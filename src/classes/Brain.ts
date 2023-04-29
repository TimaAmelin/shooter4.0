import { stats } from "../stats/bossStats";
import { stats as monsterStats } from "../stats/monsterStats";
import { Boss } from "./Boss";
import { Mine } from "./Mine";
import { Monster } from "./Monster";
import { MonsterSummoner } from "./MonsterSummoner";
import { Rooms } from "./Rooms";

export class Brain extends Boss {
    public mines: Mine[] = [];
    private minionTimer: number = 0;
    private mineTimer: number = 0;
    public name: string = 'brain';

    constructor (
        stage: string,
        x: number,
        y: number,
        orientation: 'left' | 'right'
    ) {
        super(stats.stage_2, stage, x, y, orientation);
    }

    spawnMine (rooms: Rooms) {
        if (this.mineTimer < 0) {
            let x = Math.random() * 300 - 150 + this.x;
            let y = Math.random() * 300 - 150 + this.y;

            while (!rooms.isLegalPlace(x, y)) {
                x = Math.random() * 300 - 150 + this.x;
                y = Math.random() * 300 - 150 + this.y;
            }

            let angle = Math.atan((this.y - y) / (this.x - x));

            if (x < this.x) {
                angle += Math.PI;
            }

            const mine = new Mine(this.x, this.y, x, y, angle, this.damage);

            this.mines.push(mine);
            this.mineTimer = 200;
        } else {
            this.mineTimer--;
        }
    }

    spawnMinions(monsterSummoner: MonsterSummoner, rooms: Rooms) {
        if (this.minionTimer < 0) {
            if (rooms.isLegalPlace(this.x, this.y - 100)) {
                const topMonster = new Monster(monsterStats.stage_2[0], 'stage_2', this.x, this.y - 100, 'left');
                monsterSummoner.monsters.push(topMonster);
            }
            if (rooms.isLegalPlace(this.x - 100, this.y)) {
                const leftMonster = new Monster(monsterStats.stage_2[0], 'stage_2', this.x - 100, this.y, 'left');
                monsterSummoner.monsters.push(leftMonster);
            }
            if (rooms.isLegalPlace(this.x, this.y + 100)) {
                const bottomMonster = new Monster(monsterStats.stage_2[0], 'stage_2', this.x, this.y + 100, 'left');
                monsterSummoner.monsters.push(bottomMonster);
            }
            if (rooms.isLegalPlace(this.x + 100, this.y)) {
                const rightMonster = new Monster(monsterStats.stage_2[0], 'stage_2', this.x + 100, this.y, 'left');
                monsterSummoner.monsters.push(rightMonster);
            }
            this.minionTimer = 500;
        } else {
            this.minionTimer--;
        }
    }
}