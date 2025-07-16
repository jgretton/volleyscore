import React, { useEffect, useRef } from "react";

const Modal = ({
  isModalOpen,
  children,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isModalOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleClose = () => {
      closeModal();
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [isModalOpen, closeModal]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-lg rounded-md backdrop:bg-gray-900/50"
    >
      <div className="mx-auto w-full rounded-md bg-white p-5 dark:bg-[#3E5B64]">
        <div className="mt-4">{children}</div>

        <button
          onClick={closeModal}
          className="mt-4 w-full cursor-pointer rounded border border-gray-200 bg-white px-4 py-2 text-black hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
