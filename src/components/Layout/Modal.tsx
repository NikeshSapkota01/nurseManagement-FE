import React, { Fragment } from "react";

export default function Modal({
  label,
  children,
  title,
  buttons = [],
  onDiscard,
  onConfirm,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  buttons: any;
  onDiscard: () => void;
  onConfirm: () => void;
}) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="inline-block mb-9 p-2 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-blue-200"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={() => setShowModal(true)}
      >
        {label}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t mb-5  mr-4 ml-4">
                  <h3 className="text-2xl font-semibold  ">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <Fragment>{children}</Fragment>

                {/*footer*/}
                <div className="flex items-center justify-end mr-4 ml-4 border-t border-solid border-slate-200 rounded-b">
                  {buttons.map((button: any, index: number) => (
                    <button
                      onClick={() => {
                        if (button.role === "discard") {
                          onDiscard();
                        }
                        if (button.role === "confirm") {
                          onConfirm();
                        }

                        if (button.role === "custom") {
                          button.onClick();
                        }

                        if (button.toClose) {
                          setShowModal(false);
                        }
                      }}
                      key={index}
                      className={button.classes}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
