package dev.agarcia.taskard.data.models.invitation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    List<Invitation> findByInvitedUserId(Long id);

    void deleteByInvitedUserIdAndProjectId(Long userId, Long projectId);
}
