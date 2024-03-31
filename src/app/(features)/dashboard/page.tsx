import { Logo } from "@/components/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { Chart } from "./_components/chart";
import { Suspense } from "react";
import { Task } from "./_components/completed-task";
import { getUser } from "@/app/(auth)/_services/actions";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="space-y-16">
      <Card className="p-5 bg-gradient-to-tr from-blue-700/80 to-sky-500 backdrop-blur-md text-white">
        <CardHeader className="flex-col items-start">
          <h4 className="text-2xl font-semibold">
            Good Morning, {user?.data.data?.fullName}
          </h4>
          <p>Today is a good day</p>
        </CardHeader>
        <CardBody>
          <p>Quick Actions</p>
          <div className="flex gap-5 mt-5">
            <Card className="w-20 h-20" isPressable>
              <CardBody className="justify-center items-center">
                <Logo />
              </CardBody>
            </Card>
            <Card className="w-20 h-20" isPressable>
              <CardBody className="justify-center items-center">
                <Logo />
              </CardBody>
            </Card>
            <Card className="w-20 h-20" isPressable>
              <CardBody className="justify-center items-center">
                <Logo />
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-4 gap-3 flex-row bg-none">
        {/* <For
          each={[
            {
              id: 1,
              title: "Today total hours",
              total: data.totalHours,
              unit: "Hours",
            },
            {
              id: 1,
              title: "Today total task",
              total: 10,
              unit: "Tasks",
            },
            {
              id: 1,
              title: "Last month total hours",
              total: 10,
              unit: "Hours",
            },
            {
              id: 1,
              title: "Last 7 months total task",
              total: 10,
              unit: "Tasks",
            },
          ]}
          key="index"
        >
          {(v, i) => (
            <Card className="w-30" key={i}>
              <CardHeader>{v.title}</CardHeader>
              <CardBody className="text-2xl">{v.total}</CardBody>
              <CardBody>{v.unit}</CardBody>
            </Card>
          )}
        </For> */}
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h4 className="text-2xl font-semibold mb-5">Work Hours</h4>
          <Suspense fallback={<div>Loading...</div>}>
            <Chart />
          </Suspense>
        </div>
        <div>
          <h4 className="text-2xl font-semibold mb-5">Total Task</h4>
          <Suspense fallback={<div>Loading...</div>}>
            <Chart />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold">Today&apos;s Task</h4>
            <Button size="sm" color="primary">
              Show All
            </Button>
          </div>
          <Task />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold">Uncomplete Task</h4>
            <Button size="sm" color="primary">
              Show All
            </Button>
          </div>
          <Task />
        </div>
      </div>
    </div>
  );
}
