
export interface ContactType {
  name: string;
  role: string;
  avatar: string;
}

export interface MessageType {
  id: number;
  text: string;
  sender: 'me' | 'them';
  date: string;
}

export interface ConversationType {
  id: number;
  contact: ContactType;
  messages: MessageType[];
}
