import { useSession } from "next-auth/react";
import { useEditing } from "@/contexts/EditingContext";

export default function HomeGrid() {
  const session = useSession();
  const { editing } = useEditing();

  return (
    <div
      className={`${!editing ? "" : "right-auto -left-500 overflow-hidden"} absolute top-0 right-0 bottom-0 left-0 py-6 pb-30 sm:py-8`}
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p className="text-base-content mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
          Hello,{" "}
          {session && session?.data?.user?.name
            ? session.data.user.name.split(" ")[0]
            : "user"}
          !
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="bg-base-100 absolute inset-px rounded-lg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col justify-start overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <div className="h-60"></div>
              <div className="bg-base-200 p-10 pt-8">
                <h3 className="text-primary text-sm/4 font-semibold">
                  Client Tracking
                </h3>
                <p className="text-base-content mt-2 text-lg font-medium tracking-tight">
                  Comprehensive progress monitoring
                </p>
                <p className="text-base-content/60 mt-2 max-w-lg text-sm/6">
                  Track every aspect of your clients&apos; educational journey
                  in one place. Monitor GED subject completion, assessment
                  scores, and attendance patterns to identify where support is
                  most needed.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="bg-base-100 absolute inset-px rounded-lg lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col justify-start overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <div className="h-60"></div>
              <div className="bg-base-200 p-10 pt-8">
                <h3 className="text-primary text-sm/4 font-semibold">
                  Releases
                </h3>
                <p className="text-base-content mt-2 text-lg font-medium tracking-tight">
                  Push to deploy
                </p>
                <p className="text-base-content/60 mt-2 max-w-lg text-sm/6">
                  Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus
                  massa, laoreet dapibus ex elit vitae odio.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="bg-base-100 absolute inset-px rounded-lg lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col justify-start overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <div className="h-60"></div>
              <div className="bg-base-200 p-10 pt-8">
                <h3 className="text-primary text-sm/4 font-semibold">Speed</h3>
                <p className="text-base-content mt-2 text-lg font-medium tracking-tight">
                  Built for power users
                </p>
                <p className="text-base-content/60 mt-2 max-w-lg text-sm/6">
                  Sed congue eros non finibus molestie. Vestibulum euismod
                  augue.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="bg-base-100 absolute inset-px rounded-lg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="h-60"></div>
              <div className="bg-base-200 p-10 pt-8">
                <h3 className="text-primary text-sm/4 font-semibold">
                  Integrations
                </h3>
                <p className="text-base-content mt-2 text-lg font-medium tracking-tight">
                  Connect your favorite tools
                </p>
                <p className="text-base-content/60 mt-2 max-w-lg text-sm/6">
                  Maecenas at augue sed elit dictum vulputate, in nisi aliquam
                  maximus arcu.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="bg-base-100 absolute inset-px rounded-lg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <div className="h-60"></div>
              <div className="bg-base-200 p-10 pt-8">
                <h3 className="text-primary text-sm/4 font-semibold">
                  Network
                </h3>
                <p className="text-base-content mt-2 text-lg font-medium tracking-tight">
                  Globally distributed CDN
                </p>
                <p className="text-base-content/60 mt-2 max-w-lg text-sm/6">
                  Aenean vulputate justo commodo auctor vehicula in malesuada
                  semper.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
