export function If({
  condition,
  children,
  else: e,
}: {
  condition: boolean;
  children: any;
  else?: any;
}) {
  return condition ? children : e || null;
}
