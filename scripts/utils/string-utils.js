export function noOfRepetitions(target, str) {
    let count = 0;
    for (const c of target) {
        if (c === str) count++;
    }
    return count;
}