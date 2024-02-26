import React, { ComponentPropsWithoutRef } from "react";
type Unpacked<T> = T extends (infer U)[] ? U : T;

export function For<T>({
  each,
  children,
}: {
  each: T | number;
  children: (v: Unpacked<T>, i: number) => JSX.Element;
  key?: string;
}) {
  const from = Array.isArray(each) ? each : new Array(each).fill(Math.random());
  return <>{from.map((v, i) => children(v, i))}</>;
}
