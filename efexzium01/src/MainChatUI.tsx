import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator ';

import InterstellarBackground from './InterstellarBackground';

const MessageViewArea = lazy(() => import("./MessageViewArea"));
const MessageInput = lazy(() => import("./MessageInput"));


interface ChatMessage {
  text: string;
  sender: string;
  role: 'user' | 'assistant' | 'system';
  model: string;
}

interface GoalData {
  goal: string;
  startDate: string;
  totalRemainingDays: number;
}

interface Todo {
  task: string;
  dueDate: string;
  priority: string;
  status: string;
  notes: string;
}

interface TodoOperation {
  task: string;
  operation: 'Create' | 'Update' | 'Delete';
  newData?: Partial<Todo>;
}

interface SearchResult {
  name: string;
  url: string;
  snippet: string;
}

const AI_MODELS = [
  "meta-llama/llama-3.1-70b-instruct:free",
  "meta-llama/llama-3.2-11b-vision-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "meta-llama/llama-3.1-405b-instruct:free",
  "liquid/lfm-40b:free",
  "anthropic/claude-3.5-sonnet:beta",
  "anthropic/claude-3-opus:beta",
  "qwen/qwen-2-7b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free"
];

const MainChatUI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello, World! Welcome to the AI Assistant. How can I help you today?",
      sender: 'bot',
      role: 'assistant',
      model: AI_MODELS[0]
    }
  ]);
  const [monthGoal, setMonthGoal] = useState<GoalData | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
 
  const [aiSearchActive, setAISearchActive] = useState(false);

  const OPENROUTER_API_KEY = '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';
  const YOUR_SITE_URL = 'https://your-site-url.com';
  const YOUR_SITE_NAME = 'Your Site Name';

  useEffect(() => {
    loadMonthGoal();
    loadTodos();
    loadAISearchPreference();
    const intervalId = setInterval(loadMonthGoal, 60000);

   

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('Loading state changed:', isLoading);
  }, [isLoading]);

  const loadMonthGoal = () => {
    const csvData = localStorage.getItem('monthlyGoalCSV');
    if (csvData) {
      const [goal, startDate, totalRemainingDays] = csvData.split(',');
      const updatedGoalData = calculateRemainingDays({ goal, startDate, totalRemainingDays: parseInt(totalRemainingDays, 10) });
      setMonthGoal(updatedGoalData);
    }
  };

  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  };

  const loadAISearchPreference = () => {
    const savedPreference = localStorage.getItem('aiSearchActive');
    if (savedPreference !== null) {
      setAISearchActive(JSON.parse(savedPreference));
    }
  };

  const calculateRemainingDays = (goalData: GoalData): GoalData => {
    const startDate = new Date(goalData.startDate);
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.max(30 - daysPassed, 0);
    return { ...goalData, totalRemainingDays: remainingDays };
  };

  const handleTodoOperation = (operation: TodoOperation) => {
    let updatedTodos = [...todos];
    switch (operation.operation) {
      case 'Create':
        if (operation.newData) {
          updatedTodos.push(operation.newData as Todo);
        }
        break;
      case 'Update':
        const indexToUpdate = updatedTodos.findIndex(todo => todo.task === operation.task);
        if (indexToUpdate !== -1 && operation.newData) {
          updatedTodos[indexToUpdate] = { ...updatedTodos[indexToUpdate], ...operation.newData };
        }
        break;
      case 'Delete':
        updatedTodos = updatedTodos.filter(todo => todo.task !== operation.task);
        break;
    }
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const promptAIForTodoOperation = async (userMessage: string): Promise<TodoOperation | null> => {
    setIsLoading(true);
    console.log('Starting AI prompt for todo operation');
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": YOUR_SITE_URL,
          "X-Title": YOUR_SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": selectedModel,
          "messages": [
            {
              "role": "system",
              "content": `You are an AI assistant that helps manage a todo list. The user will provide a request related to creating, updating, or deleting a todo item. Your task is to interpret the user's request and return a JSON object with the following structure: {task: string, operation: 'Create' | 'Update' | 'Delete', newData?: {task: string, dueDate: string, priority: string, status: string, notes: string}}. For 'Create' and 'Update' operations, include the 'newData' field with the relevant information. For 'Delete' operations, only include the 'task' and 'operation' fields. Current todos: ${JSON.stringify(todos)}`
            },
            {
              "role": "user",
              "content": userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      const todoOperation: TodoOperation = JSON.parse(aiResponse);
      return todoOperation;
    } catch (error) {
      console.error('Error prompting AI for todo operation:', error);
      return null;
    } finally {
      setIsLoading(false);
      console.log('Finished AI prompt for todo operation');
    }
  };

  const performWebSearch = async (query: string): Promise<SearchResult[]> => {
    try {
      const response = await axios.post('https://main-ai-api.onrender.com/search', {
        query: query,
        count: 5
      }, { timeout: 10000 });
      return response.data.results;
    } catch (error) {
      console.error('Error performing web search:', error);
      return [];
    }
  };


  const formatSearchResultsAsMarkdown = (results: SearchResult[]): string => {
    return `
  ## Web search results:
  
  ${results.map((result, index) => `
  ${index + 1}. **[${result.name}](${result.url})**
      ${'\n'}
     ${result.snippet}
  `).join('\n')}
    `.trim();
  };

  const handleMessageSent = async (newMessage: string) => {
    const userMessage: ChatMessage = { text: newMessage, sender: 'user', role: 'user', model: selectedModel };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    console.log('Starting message processing');

    try {
      if (newMessage.toLowerCase().includes('todo')) {
        const todoOperation = await promptAIForTodoOperation(newMessage);
        if (todoOperation) {
          handleTodoOperation(todoOperation);
          const operationMessage: ChatMessage = { 
            text: `Todo ${todoOperation.operation.toLowerCase()}d: ${todoOperation.task}`, 
            sender: 'bot', 
            role: 'assistant',
            model: selectedModel
          };
          setMessages(prevMessages => [...prevMessages, operationMessage]);
          return;
        }
      }

      let searchResults: SearchResult[] = [];
      if (aiSearchActive) {
        searchResults = await performWebSearch(newMessage);
        
        console.log('Search Results:', searchResults); // Add this line
        
        if (searchResults.length > 0) {
          const formatted = formatSearchResultsAsMarkdown(searchResults);
          const searchResultsMessage: ChatMessage = {
            text: formatted  ,
            sender: 'system',
            role: 'system',
            model: selectedModel
          };
          setMessages(prevMessages => [...prevMessages, searchResultsMessage]);
        } else {
          const noResultsMessage: ChatMessage = {
            text: "I'm sorry, but I couldn't retrieve any search results at the moment. The AI search API might be spinning up or experiencing issues. As we're using a free service, it may take a moment to respond. Let me answer based on my existing knowledge instead.",
            sender: 'system',
            role: 'system',
            model: selectedModel
          };
          setMessages(prevMessages => [...prevMessages, noResultsMessage]);
        }
      }

      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.text
      }));

      let monthGoalMessage = monthGoal 
        ? `Current monthly goal: ${monthGoal.goal}. Started on: ${monthGoal.startDate}. Days remaining: ${monthGoal.totalRemainingDays}.`
        : "No monthly goal set.";

      let todosMessage = todos.length > 0
        ? "Current todos:\n" + todos.map(todo => 
            `Task: ${todo.task}, Due: ${todo.dueDate}, Priority: ${todo.priority}, Status: ${todo.status}, Notes: ${todo.notes}`
          ).join("\n")
        : "No todos set.";

      let searchContext = searchResults.length > 0
        ? `Based on the following web search results:\n${JSON.stringify(searchResults, null, 2)}\n\nPlease summarize the information and respond to the user's query.`
        : '';

      console.log('Sending request to OpenRouter API');
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": YOUR_SITE_URL,
          "X-Title": YOUR_SITE_NAME,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": selectedModel,
          "messages": [
            {
              "role": "system",
              "content": `Users monthly goal information: ${monthGoalMessage}\n\nTodos information: ${todosMessage}\n\n${searchContext}`
            },
            ...messageHistory,
            {
              "role": "user",
              "content": newMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response from OpenRouter API');
      const botReply = data.choices[0].message.content;

      const botMessage: ChatMessage = { text: botReply, sender: 'bot', role: 'assistant', model: selectedModel };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = { 
        text: 'An error occurred while processing your request. Please try again later.', 
        sender: 'bot', 
        role: 'assistant',
        model: selectedModel
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log('Finished message processing');
    }
  };

  const handleFileSelected = (file: File) => {
    console.log('File selected:', file);
    // Implement file handling logic here
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const handleDeleteMessage = (index: number) => {
    setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
  };

  

  return (
    <div className="main-chat-container relative">
      {/* <Suspense fallback={<LightSpeedBackground />}> */}
        <InterstellarBackground />
        <main className="chat-content">
          <MessageViewArea 
            messages={messages} 
            aiModels={AI_MODELS}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            onDeleteMessage={handleDeleteMessage}
          />
          <MessageInput onMessageSent={handleMessageSent} onFileSelected={handleFileSelected} />
          {isLoading && <LoadingIndicator />}
        </main>
      {/* </Suspense> */}
  
    </div>
  );
};

export default MainChatUI;