import React from "react";
import ButtonComponent from "./ButtonComponent";

export default function ModalAcceptDenyComponent({ title, text, onAccept, onAcceptText, onClose, onCloseText }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
                <p>{title}</p>

                <p>{text}</p>

                <ButtonComponent
                    variant={"secondary"}
                    onClick={onAccept}
                >
                    {onAcceptText}
                </ButtonComponent>

                <ButtonComponent
                    variant={"danger"}
                    onClick={onClose}
                >
                    {onCloseText}
                </ButtonComponent>
            </div>
        </div>
    )
}