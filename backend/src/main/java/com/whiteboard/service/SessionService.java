package com.whiteboard.service;

import com.whiteboard.model.Role;
import com.whiteboard.model.SessionParticipant;
import com.whiteboard.model.User;
import com.whiteboard.model.WhiteboardSession;
import com.whiteboard.repository.SessionParticipantRepository;
import com.whiteboard.repository.UserRepository;
import com.whiteboard.repository.WhiteboardSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final WhiteboardSessionRepository sessionRepository;
    private final SessionParticipantRepository participantRepository;
    private final UserRepository userRepository;

    @Transactional
    public WhiteboardSession createSession(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate a unique 8-character session code
        String sessionCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        WhiteboardSession session = WhiteboardSession.builder()
                .sessionCode(sessionCode)
                .isActive(true)
                .build();
        
        session = sessionRepository.save(session);

        // Assign the creator as the OWNER
        SessionParticipant participant = SessionParticipant.builder()
                .user(user)
                .session(session)
                .role(Role.OWNER)
                .build();

        participantRepository.save(participant);

        return session;
    }
}
