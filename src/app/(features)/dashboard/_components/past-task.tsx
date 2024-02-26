import { For } from "@/utils/for";
import { Card, CardBody } from "@nextui-org/react";
import { DateTime } from "luxon";

export function PastTask() {
  const generateDates = () => {
    const now = DateTime.now();
    return new Array(4)
      .fill(0)
      .map((_, i) => now.minus({ day: i }).toISODate());
  };

  const labels = generateDates();

  return (
    <div className="flex flex-col gap-5">
      <For each={labels} key="index">
        {(v, i) => (
          <Card>
            <CardBody>
              <p>{v}</p>
            </CardBody>
          </Card>
        )}
      </For>
    </div>
  );
}
