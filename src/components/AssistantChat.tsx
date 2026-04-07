'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card } from './ui/Card';
import { TextInput } from './ui/TextInput';
import { Button } from './ui/Button';
import styles from './AssistantChat.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AssistantChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your Smart Venue Assistant. How can I help you navigate the stadium or find services?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMessage,
          context: {
            location: 'Section 104',
            eventStatus: 'Half-time'
          }
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'Sorry, I am facing connectivity issues.' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred while connecting to the AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.botAvatar}>
          <Bot size={24} />
        </div>
        <div>
          <h3 className={styles.headerTitle}>Venue Assistant</h3>
          <p className={styles.headerSubtitle}>Powered by Google Gemini</p>
        </div>
      </div>
      
      <div className={styles.messagesArea}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.botWrapper}`}>
            {msg.role === 'assistant' && (
              <div className={styles.messageAvatar}>
                <Bot size={16} />
              </div>
            )}
            <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.botBubble}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
            <div className={styles.messageAvatar}>
              <Bot size={16} />
            </div>
            <div className={`${styles.messageBubble} ${styles.botBubble}`}>
              <Loader2 className={styles.spinner} size={16} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <TextInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about wait times, restrooms, or exits..."
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
};
