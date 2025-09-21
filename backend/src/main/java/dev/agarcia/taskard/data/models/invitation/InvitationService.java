package dev.agarcia.taskard.data.models.invitation;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InvitationService {

    void save(Invitation invitation);

    List<Invitation> findByInvitedUserId(Long id);

    void deleteByInvitedUserIdAndProjectId(Long userId, Long projectId);

    void deleteById(Long id);

    Invitation findById(Long id);
}
