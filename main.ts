export type Event = {
    time: number;
    team: string;
    type: "entry" | "exit"
}

export type Data = Event[];

export function isValid(input: Data): boolean {
    return false;
}

