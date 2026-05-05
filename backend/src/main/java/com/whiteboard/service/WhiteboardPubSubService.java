package com.whiteboard.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whiteboard.model.DrawEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class WhiteboardPubSubService {

    private final StringRedisTemplate stringRedisTemplate;
    private final ObjectMapper objectMapper;
    private static final int MAX_EVENTS_PER_ROOM = 2000;

    @Value("${whiteboard.redis.channels.draw:whiteboard:draw}")
    private String drawChannel;

    public WhiteboardPubSubService(StringRedisTemplate stringRedisTemplate, ObjectMapper objectMapper) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishDrawEvent(DrawEvent drawEvent) {
        if (drawEvent.getTimestamp() == null) {
            drawEvent.setTimestamp(System.currentTimeMillis());
        }

        try {
            String payload = objectMapper.writeValueAsString(drawEvent);
            cacheRoomEvent(drawEvent.getRoomId(), payload);
            stringRedisTemplate.convertAndSend(drawChannel, payload);
        } catch (JsonProcessingException ex) {
            throw new IllegalArgumentException("Unable to serialize draw event", ex);
        }
    }

    private void cacheRoomEvent(String roomId, String payload) {
        if (roomId == null || roomId.isBlank()) {
            return;
        }

        String roomEventKey = "whiteboard:room:" + roomId + ":events";
        stringRedisTemplate.opsForList().rightPush(roomEventKey, payload);
        stringRedisTemplate.opsForList().trim(roomEventKey, -MAX_EVENTS_PER_ROOM, -1);
    }
}
