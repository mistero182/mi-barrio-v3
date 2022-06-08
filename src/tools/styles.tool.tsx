export function fullScreenWithBackgroundImage(image) {
    return ` 
        min-height: 100vh;
        object-fit: cover;
        background-size: cover;
        background: url(${image});
        padding: 0;
    `;
}

export function fullScreenWithBackground(color: any) {
    return ` 
        min-height: 100vh;
        background: ${color};
        padding: 0;
    `;
}
