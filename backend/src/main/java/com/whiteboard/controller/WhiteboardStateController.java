package com.whiteboard.controller;

import com.whiteboard.model.DrawEvent;
import com.whiteboard.service.WhiteboardStateService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class WhiteboardStateController {

    private final WhiteboardStateService whiteboardStateService;

    public WhiteboardStateController(WhiteboardStateService whiteboardStateService) {
        this.whiteboardStateService = whiteboardStateService;
    }

    @GetMapping("/{roomId}/events")
    public List<DrawEvent> getRoomEvents(
        @PathVariable String roomId,
        @RequestParam(defaultValue = "300") int limit
    ) {
        return whiteboardStateService.getRecentEvents(roomId, limit);
    }
}
