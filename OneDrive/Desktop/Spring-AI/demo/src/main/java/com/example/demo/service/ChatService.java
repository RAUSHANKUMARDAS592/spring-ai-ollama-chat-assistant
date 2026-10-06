package com.example.demo.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatModel chatModel;

    public ChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String generateResponse(String inputText) {

        String response = chatModel.call(inputText);

        return response;
    }
}