package com.whiteboard.repository;

import com.whiteboard.model.WhiteboardSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WhiteboardSessionRepository extends JpaRepository<WhiteboardSession, Long> {
    Optional<WhiteboardSession> findBySessionCode(String sessionCode);
}
