import type { Firestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

/** True once the VITE_FIREBASE_* environment variables are provided. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
)

export type ContactMessage = {
  name: string
  email: string
  subject: string
  message: string
}

let firestore: Promise<Firestore> | undefined

// Firebase is loaded on demand so it never weighs down the initial page load.
// Firestore Lite is enough for a write-only contact form and is far smaller.
function getFirestoreInstance() {
  firestore ??= Promise.all([
    import("firebase/app"),
    import("firebase/firestore/lite"),
  ]).then(([{ initializeApp }, { getFirestore }]) =>
    getFirestore(initializeApp(firebaseConfig))
  )
  firestore.catch(() => {
    firestore = undefined
  })
  return firestore
}

export async function saveContactMessage(message: ContactMessage) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.")
  }

  const db = await getFirestoreInstance()
  const { addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore/lite"
  )

  await addDoc(collection(db, "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  })
}
