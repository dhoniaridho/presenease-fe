import { Time } from "@/utils/datetime";
import { For } from "@/utils/for";
import { If } from "@/utils/if";
import { Card, CardBody, Checkbox, Divider } from "@nextui-org/react";

export function Task() {
  return (
    <Card>
      <CardBody>
        <For
          each={[
            {
              id: 1,
              title: "Building UI Component",
              createdAt: new Date(),
            },
            {
              id: 1,
              title: "Building UI Component",
              createdAt: new Date(),
            },
            {
              id: 1,
              title: "Building UI Component",
              createdAt: new Date(),
            },
            {
              id: 1,
              title: "Building UI Component",
              createdAt: new Date(),
            },
          ]}
          key="index"
        >
          {(v, i) => (
            <div key={i}>
              <Card shadow="none" isPressable radius="sm" className="w-full">
                <CardBody className="flex-row items-center gap-5 justify-between">
                  <div className="flex items-center">
                    <Checkbox defaultChecked />
                    <h5 className="text-lg font-semibold">{v.title}</h5>
                  </div>
                  <div className="text-sm flex items-center">
                    <Time date={v.createdAt} />
                  </div>
                </CardBody>
              </Card>
              <If condition={i !== 3}>
                <Divider />
              </If>
            </div>
          )}
        </For>
      </CardBody>
    </Card>
  );
}
