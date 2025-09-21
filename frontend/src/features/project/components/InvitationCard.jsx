import React from "react";

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import rejectInvitation from "../../../axios/project/invitation/RejectInvitationRequest";
import acceptInvitationRequest from "../../../axios/project/invitation/AcceptInvitationRequest";

export default function InvitationCard({ invitation, onReject }) {

    const accpetInvitationDTO = {
        invitationId: invitation.id,
        projectId: invitation.project.id
    }

    const handleAcceptInvitation = async () => {
        await acceptInvitationRequest(accpetInvitationDTO)
            .then((status) => {
                (status) ? onReject(invitation.id) : console.log(`Error accepting invitation!`)
            })
    }

    const handleRejectInvitation = async () => {
        await rejectInvitation(invitation.id)
            .then((status) => {
                (status) ? onReject(invitation.id) : console.log(`Error rejecting invitation!`)
            })
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow max-w-md w-full">
            <p className="text-base">
                <span className="font-semibold">{invitation.inviter.name}</span> te ha invitado
            </p>
            <div className="flex flex-row text-sm text-gray-500">
                <p className="text-sm text-gray-500 pr-30">{invitation.project.name}</p>
                <div className="flex gap-2">
                    <button
                        className="px-5 py-2.5 rounded-md text-white bg-green-500 hover:bg-green-600 hover:cursor-pointer p-2 transition-colors duration-200"
                        onClick={handleAcceptInvitation}
                    >
                        <CheckIcon className="h-5 w-5" />
                    </button>

                    <button
                        className="px-5 py-2.5 rounded-md text-white bg-red-500 hover:bg-red-600 hover:cursor-pointer p-2 transition-colors duration-200"
                        onClick={handleRejectInvitation}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}