export function Time({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{date.toLocaleTimeString()}</time>;
}

export function Date({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>;
}

export function DateTime({ date }: { date: Date }) {
  return <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>;
}
