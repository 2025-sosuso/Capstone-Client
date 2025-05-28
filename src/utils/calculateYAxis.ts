/**
 * Y축 눈금 계산 유틸
 * @param maxCount y축 최대 값
 * @param targetSteps 원하는 눈금 개수 (기본 6)
 * @returns { stepSize, roundedMax } 차트 옵션에 넣을 값
 */
export function calculateYAxis(maxCount: number, targetSteps = 6) {
    if (maxCount <= 0) {
        return { stepSize: 10, roundedMax: 50 };
    }

    const stepSize = Math.ceil(maxCount / targetSteps / 10) * 10;
    const roundedMax = Math.ceil(maxCount / stepSize) * stepSize;

    return { stepSize, roundedMax };
}
