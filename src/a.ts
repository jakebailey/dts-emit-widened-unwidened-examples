export const constValue = Math.random() > 0.5 ? "foo" : "bar";
//            ^?
export let letValue = Math.random() > 0.5 ? "foo" : "bar";
//            ^?

export function returnConstValue() {
//               ^?
    return constValue;
}

const constValueCopy: typeof constValue = constValue;
//        ^?
export const indirect = constValueCopy;
//           ^?



function foo(): { y: 1 } {
    return { y: 1 }
}

export const { y = 0 } = foo();
//             ^?

export function returnY() {
//               ^?
    return y;
}
