export function groupByBreakPoint(width: number, array: any[], breakpoints: { [x: number]: number; }) {
    const groupSize = getBreakPoint(width, array, breakpoints);
    let groups: string | any[] = [];
    while (array.length > 0) {
        if (array.length > groupSize) {
            groups.push(array.splice(0, groupSize));
        } else {
            groups.push(array.splice(0, array.length));
        }
    }
    return {
        groups,
        size: groupSize
    };
}

export function getBreakPoint(width: number, array: any[], breakpoints: { [x: number]: number; }) {
    const breaks = Object.keys(breakpoints).map(key => Number(key)).sort((a, b) => a < b ? 1 : -1);
    let key: any = breaks[breaks.length - 1];
    for (let i = 0; i < breaks.length; i++) {
        let current = Number(breaks[i]);
        if (current <= width) {
            key = current;
            break;
        }
    }
    return breakpoints[key];
}

