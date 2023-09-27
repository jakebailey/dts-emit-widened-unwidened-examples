import * as a from "./a";
export const constFromConst = a.constValue;
//            ^?
export let letFromConst = a.constValue;
//         ^?

export const constFromLet = a.letValue;
//            ^?
export let letFromLet = a.letValue;
//         ^?

export function returnConstValue() {
//               ^?
    return a.constValue;
}


export const constY = a.y;
//            ^?
export let letY = a.y;
//         ^?

export function returnY() {
//               ^?
    return a.y;
}
