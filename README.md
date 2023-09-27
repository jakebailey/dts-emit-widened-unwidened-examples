# dts-emit-widened-unwidened-examples

```sh
$ npx tsc     # Emit using current rules

$ rm src/a.ts # Simulate using d.ts files externally or via project references
$ npx tsc
$ git diff src/*d.ts
```

Gives:

```diff
diff --git a/src/b.d.ts b/src/b.d.ts
index 7978d2c..b92a151 100644
--- a/src/b.d.ts
+++ b/src/b.d.ts
@@ -2,7 +2,7 @@ export declare const constFromConst: string;
 export declare let letFromConst: string;
 export declare const constFromLet: string;
 export declare let letFromLet: string;
-export declare function returnConstValue(): "foo" | "bar";
+export declare function returnConstValue(): string;
 export declare const constY: number;
 export declare let letY: number;
-export declare function returnY(): 1 | 0;
+export declare function returnY(): number;
```

Meaning we _used_ to observe the unwidened values from `a.ts`, but now we observe the _widened_ values from `a.d.ts`.


Now, tunning with https://github.com/microsoft/TypeScript/pull/55445 which doesn't widen in `d.ts` emit:

```sh
$ tsc
$ git diff src/*.d.ts
```

```diff
diff --git a/src/a.d.ts b/src/a.d.ts
index e38d94a..7321615 100644
--- a/src/a.d.ts
+++ b/src/a.d.ts
@@ -1,6 +1,6 @@
-export declare const constValue: string;
+export declare const constValue: "foo" | "bar";
 export declare let letValue: string;
 export declare function returnConstValue(): "foo" | "bar";
 export declare const indirect: "foo" | "bar";
-export declare const y: number;
+export declare const y: 1 | 0;
 export declare function returnY(): 1 | 0;
diff --git a/src/b.d.ts b/src/b.d.ts
index 7978d2c..a79657f 100644
--- a/src/b.d.ts
+++ b/src/b.d.ts
@@ -1,8 +1,8 @@
-export declare const constFromConst: string;
+export declare const constFromConst: "foo" | "bar";
 export declare let letFromConst: string;
 export declare const constFromLet: string;
 export declare let letFromLet: string;
 export declare function returnConstValue(): "foo" | "bar";
-export declare const constY: number;
+export declare const constY: 1 | 0;
 export declare let letY: number;
 export declare function returnY(): 1 | 0;
```


```sh
$ git add .
$ rm src/a.ts # Simulate using d.ts files externally or via project references
$ tsc
$ git diff src/*.d.ts
```

```diff
diff --git a/src/b.d.ts b/src/b.d.ts
index a79657f..a561a4d 100644
--- a/src/b.d.ts
+++ b/src/b.d.ts
@@ -1,8 +1,8 @@
 export declare const constFromConst: "foo" | "bar";
-export declare let letFromConst: string;
+export declare let letFromConst: "foo" | "bar";
 export declare const constFromLet: string;
 export declare let letFromLet: string;
 export declare function returnConstValue(): "foo" | "bar";
-export declare const constY: 1 | 0;
-export declare let letY: number;
-export declare function returnY(): 1 | 0;
+export declare const constY: 0 | 1;
+export declare let letY: 0 | 1;
+export declare function returnY(): 0 | 1;
```

Now we're seeing unwidened types in all new places, even worse than the current state of things.
