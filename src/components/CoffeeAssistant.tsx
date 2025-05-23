
import React, { useState } from 'react';
import { Coffee, Send, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CoffeeAssistantProps {}

const CoffeeAssistant: React.FC<CoffeeAssistantProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hi there! I'm your NESCAFÉ Coffee Assistant. How can I help with your coffee journey today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const { toast } = useToast();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate assistant response
    setTimeout(() => {
      let response = "";
      const userMessage = input.toLowerCase();
      
      if (userMessage.includes("recommend") || userMessage.includes("suggestion")) {
        response = "Based on your Coffee Persona, I'd recommend trying our NESCAFÉ Gold Blend. It has a smooth, well-balanced taste that many of our users love!";
      } else if (userMessage.includes("points") || userMessage.includes("reward")) {
        response = "Your current Aroma Points balance is 350. You need 150 more points to unlock the 'Coffee Connoisseur' badge!";
      } else if (userMessage.includes("recipe") || userMessage.includes("make")) {
        response = "For a quick iced coffee recipe: Mix 2 tsp of NESCAFÉ Classic with 2 tbsp hot water, add ice, cold milk, and a touch of vanilla syrup. Enjoy!";
      } else if (userMessage.includes("hello") || userMessage.includes("hi")) {
        response = "Hello! How can I assist with your coffee experience today?";
      } else {
        response = "I'm here to help with coffee recommendations, recipes, or to answer questions about your NESCAFÉ journey. What would you like to know?";
      }
      
      setMessages([...newMessages, { text: response, isUser: false }]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-nescafe-red to-nescafe-brown p-3 text-white flex justify-between items-center">
            <div className="flex items-center">
              <Coffee className="mr-2 h-5 w-5" />
              <h3 className="font-bold">Coffee Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-grow h-80 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.isUser 
                      ? 'bg-nescafe-red text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about coffee..."
              className="flex-grow border rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-nescafe-red"
            />
            <Button 
              onClick={handleSendMessage} 
              className="rounded-l-none bg-nescafe-red hover:bg-nescafe-brown text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full h-14 w-14 bg-nescafe-red hover:bg-nescafe-brown text-white shadow-lg flex items-center justify-center"
        >
          <Coffee className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default CoffeeAssistant;
