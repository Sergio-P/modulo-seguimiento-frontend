import clsx from "clsx";
import Image from "next/image";
import _ from 'lodash';
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
  disabled?: boolean;
}

export default function ModalMetastasis(props: ButtonProps) {
  const { disabled, filled, icon } = props;
  let [isOpenMetastasis, setIsOpenMetastasis] = useState(false)

  function closeModalMetastasis() {
    setIsOpenMetastasis(false)
  }

  function openModalMetastasis() {
    setIsOpenMetastasis(true)
    console.log(isOpenMetastasis)
  }

  return (
    <>
    <button
      {..._.omit(props, ['icon', 'filled'])}
      onClick={openModalMetastasis}
      className={clsx(
        "h-10 rounded-lg border-2 border-primary text-sm tracking-wide",
        props.children ? "px-4" : "w-10",
        filled ? "bg-primary text-white" : "text-primary",
        disabled && "bg-primary border-primary border-opacity-0 bg-opacity-50",
        props.className
      )}
    >
      {icon && props.children ? (
        <div className="flex items-center gap-3">
          <Image
            src={`/icons/${icon}.svg`}
            width={16}
            height={16}
            alt=""
            className="h-4 w-4"
          />
          <div>{props.children}</div>
        </div>
      ) : icon && !props.children ? (
        <Image
          src={`/icons/${icon}.svg`}
          width={16}
          height={16}
          alt=""
          className="m-auto h-4 w-4"
        />
      ) : (
        props.children
      )}
    </button>
    <Transition appear show={isOpenMetastasis} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalMetastasis}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalMetastasis}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
