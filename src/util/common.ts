export const numberComma = (paramNum: number) => {
    return paramNum.toLocaleString('ko-KR')
}
export const numberPercent = (paramNum: number) => {
    return Number(paramNum.toFixed(3)) * 100 + '%'
}