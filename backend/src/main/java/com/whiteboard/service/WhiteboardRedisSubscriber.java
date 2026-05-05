package com.whiteboard.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whiteboard.model.DrawEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WhiteboardRedisSubscriber {

    private static final Logger logger = LoggerFactory.getLogger(WhiteboardRedisSubscriber.class);

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    public WhiteboardRedisSubscriber(ObjectMapper objectMapper, SimpMessagingTemplate messagingTemplate) {
        this.objectMapper = objectMapper;
        this.messagingTemplate = messagingTemplate;
    }

    public void onMessage(String message) {
        try {
            DrawEvent drawEvent = objectMapper.readValue(message, DrawEvent.class);

            if (drawEvent.getRoomId() == null || drawEvent.getRoomId().isBlank()) {
                logger.warn("Dropping draw event with missing roomId");
                return;
            }

            messagingTemplate.convertAndSend(
                "/topic/rooms/" + drawEvent.getRoomId() + "/draw",
                drawEvent
            );
        } catch (JsonProcessingException ex) {
            logger.error("Unable to deserialize draw event from Redis", ex);
        }
    }
}
