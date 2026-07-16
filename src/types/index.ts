export interface Person {
  name: string;
}

export interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  googleMapsUrl: string;
}

export interface StoryItem {
  title: string;
  subtitle: string;
  image: string;
}

export interface HeartParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  opacity: number;
}

export type RsvpStatus = 'going' | 'not_going';

export interface InvitePayload {
  name: string;
  phone?: string;
  status: RsvpStatus;
  message?: string;
  numberOfGuests?: number;
}
