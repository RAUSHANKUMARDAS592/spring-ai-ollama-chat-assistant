package com.example.demo.controller;

import com.example.demo.service.ChatService;
//import com.openai.models.responses.Response;
//import com.openai.services.blocking.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping
    public ResponseEntity<String> generateResponse(
            @RequestParam(value="inputText",required = true) String inputText
    ){
        String responseText=chatService.generateResponse(inputText);
      return ResponseEntity.ok(responseText);
    }
}
