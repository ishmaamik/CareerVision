import io from 'socket.io-client';

class InterviewSocket {
  constructor() {
    // Use environment variable for socket server URL
    this.socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL || 'https://socket-1-pmz3.onrender.com';
    this.socket = null;
    this.rooms = new Map();
  }

  connect(roomId, username) {
    // Disconnect existing socket if any
    if (this.socket) {
      this.socket.disconnect();
    }

    // Create new socket connection
    this.socket = io(this.socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // Join room event
    this.socket.emit('join-room', { roomId, username });

    // Setup event listeners
    this.setupListeners(roomId, username);

    return this.socket;
  }

  setupListeners(roomId, username) {
    if (!this.socket) return;

    // User count tracking
    this.socket.on('user-count', (count) => {
      console.log(`Users in room ${roomId}: ${count}`);
    });

    // Document/content collaboration
    this.socket.on('receive-changes', (delta) => {
      // Emit received changes to subscribers
      this.emitEvent('content-change', delta);
    });

    // Error handling
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  sendChanges(roomId, delta) {
    if (this.socket) {
      this.socket.emit('send-changes', { delta, roomId });
    }
  }

  // Generic event management
  events = {};
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emitEvent(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new InterviewSocket();
