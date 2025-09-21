package dev.agarcia.taskard.data.models.invitation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Override
    public void save(Invitation invitation) {
        this.invitationRepository.save(invitation);
    }

    @Override
    public List<Invitation> findByInvitedUserId(Long id) {
        return this.invitationRepository.findByInvitedUserId(id);
    }

    @Override
    public void deleteByInvitedUserIdAndProjectId(Long userId, Long projectId) {
        this.invitationRepository.deleteByInvitedUserIdAndProjectId(userId, projectId);
    }

    @Override
    public void deleteById(Long id) {
        this.invitationRepository.deleteById(id);
    }

    @Override
    public Invitation findById(Long id) {
        return this.invitationRepository.findById(id).orElse(null);
    }
}
