import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import type { InvitePayload } from '../types';

const _key = 'invitee';

/**
 * Creates a new RSVP document in the Firestore "invites" collection,
 * matching the schema and behavior of the Flutter app.
 */
export async function createInvite(payload: InvitePayload): Promise<void> {
  const docRef = payload.phone
    ? doc(db, 'invites', payload.phone)
    : doc(collection(db, 'invites'));

  const invitee = {
    name: payload.name,
    message: payload.message || null,
    numberOfGuests: payload.numberOfGuests || null,
    status: payload.status,
    createdAt: new Date().toISOString(),
    respondedAt: new Date().toISOString(),
  };

  localStorage.setItem(_key, JSON.stringify(payload));

  await setDoc(docRef, invitee);
}

/**
 * Fetches a sent invite by phone number.
 */
export async function getInvite(phone: string): Promise<any | null> {
  const docRef = doc(db, 'invites', phone);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

/**
 * Subscribes to updates for a sent invite by phone number.
 * Returns the unsubscribe function.
 */
export function watchInvite(phone: string, callback: (data: any | null) => void): () => void {
  const docRef = doc(db, 'invites', phone);
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      callback(null);
    }
  });
}

export function getLocalInvite(): InvitePayload | null {
  const raw = localStorage.getItem(_key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
