export interface WebSocketOptions {
  query?: Record<string, string | number | boolean> | string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxConnectionAttempts?: number;
}

type EventCallback = (...args: unknown[]) => void;
type EventMap = Map<string, EventCallback[]>;

interface EnhancedWebSocket extends WebSocket {
  on: (eventName: string, callback: EventCallback) => () => void;
  off: (eventName: string, callback?: EventCallback) => void;
  emit: (eventName: string, data?: unknown) => boolean;
  disconnect: () => void;
  isConnected: () => boolean;
  eventListeners?: EventMap;
}

let socket: EnhancedWebSocket | null = null;

const connectWebsocket = (options: WebSocketOptions = {}) => {
  let fullUrl =
    String(import.meta.env.VITE_BACKEND_SOCKET_URL) || "ws://localhost:10010";
  if (options.query) {
    const queryString =
      typeof options.query === "string"
        ? options.query
        : Object.entries(options.query)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
    fullUrl += `?${queryString}`;
  }

  if (socket && socket.readyState !== WebSocket.CLOSED) {
    socket.close();
  }

  const ws = new WebSocket(fullUrl) as EnhancedWebSocket;
  const eventListeners: EventMap = new Map();
  ws.eventListeners = eventListeners;

  ws.onmessage = (event: MessageEvent) => {
    try {
      const parsedData = JSON.parse(event.data);
      const { name: eventName, data: eventData } = parsedData;
      if (eventName && eventListeners.has(eventName)) {
        eventListeners
          .get(eventName)
          ?.forEach((callback) => callback(eventData));
      }
    } catch (e) {
      console.log(event);
      console.error(e);
    }
  };

  ws.onopen = () => {
    console.log("WebSocket connected");
    if (eventListeners.has("connect")) {
      eventListeners.get("connect")?.forEach((callback) => callback());
    }
  };

  ws.onclose = (even: CloseEvent) => {
    console.log("WebSocket disconnected");
    if (eventListeners.has("disconnect")) {
      eventListeners.get("disconnect")?.forEach((callback) => callback(even));
    }
  };

  ws.onerror = (even: Event) => {
    console.log("WebSocket error");
    if (eventListeners.has("error")) {
      eventListeners.get("error")?.forEach((callback) => callback(even));
    }
  };

  ws.on = (eventName: string, callback: EventCallback) => {
    if (!eventListeners.has(eventName)) {
      eventListeners.set(eventName, []);
    }
    eventListeners.get(eventName)?.push(callback);
    return () => {
      const listeners = eventListeners.get(eventName);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    };
  };

  ws.off = (eventName: string, callback?: EventCallback) => {
    if (eventListeners.has(eventName)) {
      if (callback) {
        const listeners = eventListeners.get(eventName);
        if (listeners) {
          const index = listeners.indexOf(callback);
          if (index !== -1) {
            listeners.splice(index, 1);
          }
        }
      } else {
        eventListeners.delete(eventName);
      }
    }
  };

  ws.emit = (eventName: string, data?: unknown) => {
    if (ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        name: eventName,
        data: data || null,
      });
      ws.send(message);
      return true;
    }
    return false;
  };

  ws.disconnect = () => {
    ws.close();
  };

  ws.isConnected = () => {
    return ws.readyState === WebSocket.OPEN;
  };

  socket = ws;
};

export { connectWebsocket, socket };

