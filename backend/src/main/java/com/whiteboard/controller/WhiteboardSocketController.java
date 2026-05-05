package com.whiteboard.controller;

import com.whiteboard.model.DrawEvent;
import com.whiteboard.service.WhiteboardPubSubService;
import java.security.Principal;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WhiteboardSocketController {

    private final WhiteboardPubSubService whiteboardPubSubService;

    public WhiteboardSocketController(WhiteboardPubSubService whiteboardPubSubService) {
        this.whiteboardPubSubService = whiteboardPubSubService;
    }

    @MessageMapping("/rooms/{roomId}/draw")
    public void handleDrawEvent(
        @DestinationVariable String roomId,
        DrawEvent drawEvent,
        Principal principal
    ) {
        drawEvent.setRoomId(roomId);

        if ((drawEvent.getUserId() == null || drawEvent.getUserId().isBlank()) && principal != null) {
            drawEvent.setUserId(principal.getName());
        }

        whiteboardPubSubService.publishDrawEvent(drawEvent);
    }
}
