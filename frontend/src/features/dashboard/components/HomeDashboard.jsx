import React from "react";
import { useEffect, useState } from "react";

import getInvitationsByUserRequest from "../../../axios/project/invitation/GetInvitatonsByUserRequest"
import InvitationCard from "../../project/components/InvitationCard"

export default function HomeDashboard() {

    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        fetchInvitations()
    }, [])

    useEffect(() => {
        console.log(invitations)
    }, [invitations])

    const fetchInvitations = async () => {
        const fetchedInvitations = await getInvitationsByUserRequest()

        if (fetchedInvitations.length > 0) {
            setInvitations(fetchedInvitations)
        }
    }

    const handleReject = (invitationId) => {
        setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId))
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            {invitations && (
                invitations.map((invitation) => (
                    <InvitationCard
                        invitation={invitation}
                        onReject={handleReject}
                    />
                )
                )
            )}
        </>
    )
}