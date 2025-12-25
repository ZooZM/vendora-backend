import admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
  // لو هتستخدم Realtime DB ضيف السطر ده، لو Firestore مش لازم
  // databaseURL: "https://vendora-xxxx.firebaseio.com"
});

export const db = admin.firestore(); // لو بتستخدم Firestore
export const auth = admin.auth(); // لو هتتحكم في اليوزرز
