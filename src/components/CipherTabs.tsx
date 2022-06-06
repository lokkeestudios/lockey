/* component imports */
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CipherTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Caesar
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Vigenère
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Substitution
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>Caesar Cipher</Tab.Panel>
        <Tab.Panel>Vigenère Cipher</Tab.Panel>
        <Tab.Panel>Substitution Cipher</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
