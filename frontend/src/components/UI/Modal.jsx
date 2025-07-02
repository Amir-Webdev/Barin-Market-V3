import React from "react";
import Button from "./Button";

function Modal({
  id = "modal",
  children,
  title,
  text,
  modalButtonColor,
  modalButtonSize = "sm",
  confirmText,
  cancelText,
  onConfirm,
  isLoading,
}) {
  return (
    <>
      <Button
        color={modalButtonColor}
        size={modalButtonSize}
        onClick={() => document.getElementById(id).showModal()}
      >
        {children}
      </Button>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{text || "آیا مطمئن هستید؟"}</p>
          <div className="modal-action flex justify-start">
            <form method="dialog" className="w-1/2">
              <div className="flex justify-between">
                <Button color="green" onClick={onConfirm} disabled={isLoading}>
                  {confirmText}
                </Button>
                <Button color="red" disabled={isLoading}>
                  {cancelText}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
