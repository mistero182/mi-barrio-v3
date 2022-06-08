export function getWidthAndHeight(maxColumns: number, percentagePerColumn: number, ratio: string, increment: number = 1) {
    let size = heightWidth(maxColumns, percentagePerColumn, ratio, increment);
    size.width = size.width >= 99 ? 100 : size.width;
    size.height = size.height >= 99 ? 100 : size.height;
    const max = Math.max(size.width, size.height);
    if (max > 99) {
        return scaleSize(size, max);
    }
    return size;
}

function heightWidth(maxColumns: number, percentagePerColumn: number, ratio: string, increment: number = 1) {
    if (!/^\d+x\d+$/.test(ratio)) {
        ratio = '1x1';
    }
    let [w, h] = ratio.split('x');
    let width = Number(w);
    let height = Number(h);
    return {
        width: Math.round(width * increment * percentagePerColumn),
        height: Math.round(height * increment * percentagePerColumn),
    };
}

export function getSize(screenSize, height: number, width: number, variation: number): { height: string, width: string } {
    const unitH = screenSize.h / 100;
    const unitW = screenSize.w / 100;
    const maxH = unitH * (100 - variation);
    const maxW = unitW * (100 - variation);

    const maxRelation = Math.min(maxH/ height, maxW / width);
    return {
        height: `${maxRelation * height / unitH}vh`,
        width: `${maxRelation * width / unitW}vw`
    }
}

function scaleSize(size: any, max: number) {
    let {width, height} = size;
    const percentage = 99 / max;
    return {
        width: width * percentage,
        height: height * percentage,
    }
}

function getRatio(ratio: string) {
    const [w, h] = (ratio || '').split('x');
    if (w == null || h == null) {
        return {
            w: 1,
            h: 1
        }
    }
    return {
        w: Number(w),
        h: Number(h),
    }
}

export function getMaxDimension(width: number, imgWidth: number, imgHeight: number, imgWidthString: string, imgHeightString: string) {
    const unitW = Number(imgWidthString.replace('vw', ''));
    const unitH = Number(imgHeightString.replace('vw', ''));
    const unitWidth = width / 100;
    const calcH = unitH * unitWidth;
    const calcW = unitW * unitWidth;
    const min = Math.min(imgWidth, imgHeight);
    let maxRatio;
    if (min === imgWidth) {
        const percentage = calculatePercentage(imgWidth, calcW);
        const height = percentage * imgHeight;
        maxRatio = calcH < height ? 'w' : 'h';
    } else {
        const percentage = calculatePercentage(imgHeight, calcH);
        const width = percentage * imgWidth;
        maxRatio = calcW < width ? 'h' : 'w';
    }
    return {
        width: maxRatio === 'w' ? '100%' : 'auto',
        height: maxRatio === 'w' ? 'auto' : '100%',
    }
}

function calculatePercentage(current: number, result: number) {
    return result / current;
}
