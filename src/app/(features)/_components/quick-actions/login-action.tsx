import { For } from "@/utils/for";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Tasks } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  CheckinPayloadType,
  onCheckin,
} from "@/app/(features)/checkins/_services/actions";

export function LoginAction() {
  const [activities, setActivities] = useState<CheckinPayloadType>([
    {
      name: undefined,
    },
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isCheckinPending } = useMutation({
    mutationFn: async (payload: CheckinPayloadType) => {
      return onCheckin(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const onAddActivity = () => {
    setActivities([...activities, {}]);
  };

  const onDeleteActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
      <ModalBody>
        <div className="space-y-3">
          <For each={activities}>
            {({ name }, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input
                  autoFocus
                  label="Please Enter Your Activity"
                  name={`name[${i}]`}
                  autoComplete="off"
                  onChange={(e) => {
                    activities[i].name = e.target.value;
                    setActivities(activities);
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      if (!e.currentTarget.value) return;
                      onAddActivity();
                    }
                    if (e.key == "Backspace" && !e.currentTarget.value)
                      onDeleteActivity(i);
                  }}
                />
                <Button
                  color="danger"
                  isIconOnly
                  variant="ghost"
                  onPress={() => onDeleteActivity(i)}
                >
                  x
                </Button>
              </div>
            )}
          </For>
          <Button
            className="w-full"
            color="primary"
            variant="flat"
            onPress={onAddActivity}
          >
            Add Activity
          </Button>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light">
          Close
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isCheckinPending}
          onPress={() => checkin(activities)}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );
}
