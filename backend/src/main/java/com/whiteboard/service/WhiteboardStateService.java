package com.whiteboard.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whiteboard.model.DrawEvent;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class WhiteboardStateService {

    private static final Logger logger = LoggerFactory.getLogger(WhiteboardStateService.class);
    private final StringRedisTemplate stringRedisTemplate;
    private final ObjectMapper objectMapper;

    public WhiteboardStateService(StringRedisTemplate stringRedisTemplate, ObjectMapper objectMapper) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.objectMapper = objectMapper;
    }

    public List<DrawEvent> getRecentEvents(String roomId, int limit) {
        if (roomId == null || roomId.isBlank()) {
            return Collections.emptyList();
        }

        int safeLimit = Math.max(1, Math.min(limit, 2000));
        String roomEventKey = "whiteboard:room:" + roomId + ":events";

        Long size = stringRedisTemplate.opsForList().size(roomEventKey);
        if (size == null || size == 0) {
            return Collections.emptyList();
        }

        long start = Math.max(0, size - safeLimit);
        List<String> payloads = stringRedisTemplate.opsForList().range(roomEventKey, start, size - 1);

        if (payloads == null || payloads.isEmpty()) {
            return Collections.emptyList();
        }

        List<DrawEvent> events = new ArrayList<>(payloads.size());
        for (String payload : payloads) {
            try {
                events.add(objectMapper.readValue(payload, DrawEvent.class));
            } catch (JsonProcessingException ex) {
                logger.warn("Skipping malformed room event payload", ex);
            }
        }

        return events;
    }
}
