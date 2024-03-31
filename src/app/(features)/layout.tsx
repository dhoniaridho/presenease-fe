"use client";
import "@/styles/globals.css";
import { Logo } from "@/components/icons";
import {
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  User,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const p = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const { data, refetch, isLoading } = useQuery({
  //   queryKey: ["checkin"],
  //   queryFn: async () => {
  //     return getLastCheckin(p);
  //   },
  // });

  // const queryClient = useQueryClient();

  // const { mutate: checkout, isPending: isCheckoutPending } = useMutation({
  //   mutationFn: async () => {
  //     return onCheckout();
  //   },
  //   onSuccess: () => {
  //     refetch();
  //     queryClient.invalidateQueries();
  //   },
  // });

  // const { mutate: leave, isPending: isLeavePending } = useMutation({
  //   mutationFn: async () => {
  //     return onLeave("ngapain ?");
  //   },
  //   onSuccess: () => {
  //     refetch();
  //     queryClient.invalidateQueries();
  //   },
  // });

  // const { mutate: comeBack, isPending: isBackPending } = useMutation({
  //   mutationFn: async () => {
  //     return onComeBack();
  //   },
  //   onSuccess: () => {
  //     refetch();
  //     queryClient.invalidateQueries();
  //   },
  // });

  return (
    <div className="relative flex h-screen py-5">
      <aside className="flex flex-col w-96 sticky left-0 top-0 bottom-0 pl-5 space-y-5">
        <div className="w-full flex justify-center h-20 items-center">
          <Logo />
        </div>
        <Card className="bg-white">
          <CardBody className="gap-5">
            <Listbox label="Navigation" selectedKeys={["dashboard"]}>
              <ListboxItem key="dashboard" className="h-12" href="/dashboard">
                Dashboard
              </ListboxItem>
              <ListboxItem key="checkins" className="h-12" href="/checkins">
                Checkins
              </ListboxItem>
              <ListboxItem key="activity" className="h-12" href="/activities">
                Activity
              </ListboxItem>
            </Listbox>
          </CardBody>
        </Card>

        {/* <Loader>
          <h4>Quick Action</h4>
          <div className="w-full space-y-2">
            <If
              condition={["AFK", "BACK", "LOGIN"].includes(
                data?.status as string
              )}
            >
              <Button
                isLoading={isCheckoutPending}
                onPress={() => checkout()}
                className="bg-danger text-white w-full"
              >
                Logout
              </Button>
            </If>
            <If condition={["LOGOUT"].includes(data?.status as string)}>
              <Button onPress={onOpen} className="bg-primary text-white w-full">
                Login
              </Button>
            </If>

            <If condition={["LOGIN", "BACK"].includes(data?.status as string)}>
              <Button
                onPress={() => leave()}
                className="bg-warning text-white w-full"
              >
                Logout
              </Button>
            </If>
            <If condition={data?.status == "AFK"}>
              <Button
                onPress={() => comeBack()}
                className="bg-success text-white w-full"
              >
                Back
              </Button>
            </If>
          </div>
        </Loader> */}

        <h4>Master Data</h4>
        <Card className="bg-white mt-5">
          <CardBody className="gap-5">
            <Listbox label="Navigation" selectedKeys={["dashboard"]}>
              <ListboxItem key="dashboard" className="h-12" href="/users">
                Users
              </ListboxItem>
              <ListboxItem key="checkins" className="h-12" href="/projects">
                Projects
              </ListboxItem>
            </Listbox>
          </CardBody>
        </Card>

        <h4>Settings</h4>
        <Card className="bg-white mt-5">
          <CardBody className="gap-5">
            <Listbox label="Navigation" selectedKeys={["dashboard"]}>
              <ListboxItem key="dashboard" className="h-12" href="/home">
                API Keys
              </ListboxItem>
              <ListboxItem key="checkins" className="h-12" href="/about">
                App Settings
              </ListboxItem>
            </Listbox>
          </CardBody>
        </Card>
      </aside>
      <main className="flex-1 overflow-auto px-5">
        <Card
          className="sticky top-0 z-50 bg-white/70 backdrop-blur-md"
          isBlurred
        >
          <CardBody className="w-full flex-row justify-end">
            <User
              name=""
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
              }}
            />
          </CardBody>
        </Card>
        <div className="mt-4">
          {children}
          <Card
            as="footer"
            className="h-20 flex justify-center items-end bg-white mt-20 rounded-lg px-5"
          >
            <p>Copyright © 2022. All Rights Reserved.</p>
          </Card>
        </div>
      </main>

      <Modal
        size="5xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent> f</ModalContent>
      </Modal>
    </div>
  );
}
