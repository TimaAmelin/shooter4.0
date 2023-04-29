export type monsterSkinsType = {
    stage_1: Partial<monsters>[];
    stage_2: Partial<monsters>[];
    stage_3: Partial<monsters>[];
}

export type monsterLevelsType = {
    brain: number;
    bug: number;
    clown: number;
    demon: number;
    droid: number;
    monster: number;
    skeleton: number;
    water: number;
    werewolf: number;
    zombie: number;
}

export type room = {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export type monsterStats = {
    name: string;
    hp: number;
    damage: number;
    speed: number;
    probWeight: number;
}

export type monsters =  'arctic' |
                        'astronaut' |
                        'brain' |
                        'bug' |
                        'chuck' |
                        'clown' |
                        'demon' |
                        'droid' |
                        'hamster' |
                        'monster' |
                        'redhood' |
                        'skeleton' |
                        'stealthy' |
                        'swat' |
                        'water' |
                        'werewolf' |
                        'zombie';