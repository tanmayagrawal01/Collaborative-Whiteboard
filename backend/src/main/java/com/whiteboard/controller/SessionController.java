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

    @PutMapping("/{id}/save")
    public ResponseEntity<Void> saveCanvasState(@PathVariable Long id, @RequestBody SaveCanvasRequest request) {
        sessionService.saveCanvasData(id, request.getCanvasData());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/load")
    public ResponseEntity<String> loadCanvasState(@PathVariable Long id) {
        String canvasData = sessionService.getCanvasData(id);
        return ResponseEntity.ok(canvasData);
    }

    @Data
    public static class SaveCanvasRequest {
        private String canvasData;
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
