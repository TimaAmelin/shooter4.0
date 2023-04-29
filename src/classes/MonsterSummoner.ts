import { room, monsterStats }  from '../types/gameTypes'; 
import { stats } from '../stats/monsterStats';
import { Monster } from './Monster';
import { Player } from './Player';
import { Rooms } from './Rooms';
import { King } from './King';
import { Brain } from './Brain';
import { Banana } from './Banana';

export class MonsterSummoner {
    private timer: number;
    public monsters: Monster[];
    public boss: King | Brain | Banana | undefined;
    private rooms: room[];

    constructor () {
        this.timer = 1000;
        this.monsters = [];
        this.boss = undefined;
        this.rooms = [
            {
                left: 615,
                right: 1380,
                top: 610, 
                bottom: 1320
            },
            {
                left: 615,
                right: 1695,
                top: 1634, 
                bottom: 2002
            },
            {
                left: 615,
                right: 1695,
                top: 2318, 
                bottom: 3202
            },
            {
                left: 2000,
                right: 3145,
                top: 610, 
                bottom: 2002
            },
            {
                left: 2000,
                right: 3145,
                top: 2318, 
                bottom: 3202
            }
        ];
    }

    private chooseMonster(stage: 'stage_1' | "stage_2" | "stage_3", ) {
        const sumMonsterWeight = Object.values(stats[stage])
                                    .map((monster: monsterStats) => monster.probWeight)
                                    .reduce((a: number, b: number) => a + b);
        const monsterCoef = Math.random();

        let coefSum = 0;

        for (let i = 0; i < stats[stage].length; i++) {
            const monster = stats[stage][i];

            coefSum += monster.probWeight / sumMonsterWeight;

            if (coefSum > monsterCoef) {
                return monster;
            };
        };
    }

    public summon (player: Player, stage: 'stage_1' | "stage_2" | "stage_3" = 'stage_1') {
        if (this.timer > 0) {
            this.timer--;
            return
        }
        
        if (this.timer !== -1) {
            const coords = this.generateCoords(player);
            const orientation = coords.x > player.x ? 'left' : 'right';

            const chosenMonster = this.chooseMonster(stage);
            if (!chosenMonster) {
                return;
            }
            const monster = new Monster(
                chosenMonster,
                stage,
                coords.x,
                coords.y,
                orientation
            );
            this.monsters.push(monster);
            this.timer = 120 / (player.score / 100 + 1);
        };
    }

    private generateCoords (player: Player) {
        const roomNumber = Math.floor(Math.random() * 5);
        let x = Math.floor(Math.random() * (this.rooms[roomNumber].right - this.rooms[roomNumber].left + 1) + this.rooms[roomNumber].left);
        let y = Math.floor(Math.random() * (this.rooms[roomNumber].bottom - this.rooms[roomNumber].top + 1) + this.rooms[roomNumber].top);
        while (Math.abs(player.x - x) <= 150 && Math.abs(player.y - y) <= 150) {
            x = Math.floor(Math.random() * (this.rooms[roomNumber].right - this.rooms[roomNumber].left + 1) + this.rooms[roomNumber].left);
            y = Math.floor(Math.random() * (this.rooms[roomNumber].bottom - this.rooms[roomNumber].top + 1) + this.rooms[roomNumber].top);
        };
        return ({x, y});
    }

    public draw1 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.monsters.sort((monster1, monster2) => monster1.y - monster2.y).map(monster => {
            if (!this.boss) {
                if (monster.y < player.y && monster.alive && ctx) {
                    ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
                };
                return null;
            }
            if (monster.y < player.y && monster.y < this.boss.y && monster.alive && ctx) {
                ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                ctx.fillStyle = 'black';
                ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                ctx.fillStyle = 'red';
                ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
            };
            return null;
        });
    }

    public draw2 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.monsters.sort((monster1, monster2) => monster1.y - monster2.y).map(monster => {
            if (!this.boss) {
                if (monster.y >= player.y && monster.alive && ctx) {
                    ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
                };
                return null;
            }
            if (this.boss.y < player.y) {
                if (monster.y < player.y && monster.y >= this.boss.y && monster.alive && ctx) {
                    ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
                };
                return null;
            }
            if (monster.y >= player.y && monster.y < this.boss.y && monster.alive && ctx) {
                ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                ctx.fillStyle = 'black';
                ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                ctx.fillStyle = 'red';
                ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
            };
            return null;
        });
    }

    public draw3 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.monsters.sort((monster1, monster2) => monster1.y - monster2.y).map(monster => {
            if (!this.boss) {
                if (monster.y >= player.y && monster.alive && ctx) {
                    ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                    ctx.fillStyle = 'red';
                    ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
                };
                return null;
            }
            if (monster.y >= player.y && monster.y >= this.boss.y && monster.alive && ctx) {
                ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                ctx.fillStyle = 'black';
                ctx.fillRect(monster.x - player.x + player.shownx - 6 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                ctx.fillStyle = 'red';
                ctx.fillRect(monster.x - player.x + player.shownx - 3 - monster.maxHealth / 2 + 50, monster.y - player.y + player.showny - 22, monster.health, 14);
            };
            return null;
        });
    }

    public move (rooms: Rooms, player: Player) {
        this.monsters.map(monster => monster.move(rooms, player));
        // this.boss.move(player)
    }
};