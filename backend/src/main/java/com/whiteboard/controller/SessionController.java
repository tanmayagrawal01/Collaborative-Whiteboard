package com.whiteboard.controller;

import com.whiteboard.model.Role;
import com.whiteboard.model.SessionParticipant;
import com.whiteboard.model.WhiteboardSession;
import com.whiteboard.service.SessionService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/create")
    public ResponseEntity<WhiteboardSession> createSession(@RequestBody CreateSessionRequest request) {
        WhiteboardSession session = sessionService.createSession(request.getUserId());
        return ResponseEntity.ok(session);
    }

    @PostMapping("/join")
    public ResponseEntity<SessionParticipant> joinSession(@RequestBody JoinSessionRequest request) {
        SessionParticipant participant = sessionService.joinSession(
                request.getUserId(),
                request.getSessionCode(),
                request.getRole()
        );
        return ResponseEntity.ok(participant);
    }

    @Data
    public static class CreateSessionRequest {
        private Long userId;
    }

    @Data
    public static class JoinSessionRequest {
        private Long userId;
        private String sessionCode;
        private Role role;
    }
}
