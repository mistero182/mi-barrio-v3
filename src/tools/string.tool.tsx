export function reduceString(text: string, maxChars: number): string {
    if (text && text.length > maxChars) {
        return text.substr(0, maxChars) + '...';
    }
    return text;
}
