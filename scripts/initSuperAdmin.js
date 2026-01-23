
/**
 * ⚠️ ONE-TIME INITIALIZATION SCRIPT ⚠️
 * 
 * Purpose: Elevate 'komaweb99@gmail.com' to SUPER_ADMIN.
 * Usage: Run manually via Node.js.
 * 
 * Dependencies: 
 *  - firebase-admin
 *  - A valid service-account.json key file from Firebase Console
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// CONFIGURATION
const TARGET_EMAIL = 'komaweb99@gmail.com';
const TARGET_UID_HINT = 'cXg2lzZC2Wd1HRgpgGSt8WvhDLH2'; // Used for verification if found
const ROLE_NAME = 'super_admin'; // Specifically requested role

// 1. Initialize SDK
// You must download your service account key from:
// Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`❌ Error: 'service-account.json' not found in ${__dirname}`);
  console.error("-> Download it from Firebase Console > Project Settings > Service Accounts.");
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

async function promoteToSuperAdmin() {
  console.log(`🔍 Looking up user: ${TARGET_EMAIL}...`);

  try {
    // 2. Fetch User
    const user = await auth.getUserByEmail(TARGET_EMAIL);
    
    console.log(`✅ User found: ${user.uid}`);
    if (user.uid !== TARGET_UID_HINT) {
        console.warn(`⚠️ Warning: Fetched UID (${user.uid}) does not match hint (${TARGET_UID_HINT}). Using fetched UID.`);
    }

    // 3. Set Auth Custom Claims (Critical for Security Rules)
    // We strictly use 'super_admin' as requested.
    // Note: Ensure your app logic checks for 'super_admin' or 'admin'.
    const currentClaims = user.customClaims || {};
    await auth.setCustomUserClaims(user.uid, {
      ...currentClaims,
      role: ROLE_NAME
    });
    console.log(`✅ Auth Claims updated: role = '${ROLE_NAME}'`);

    // 4. Update Firestore Profile
    const userRef = db.collection('users').doc(user.uid);
    
    // We use set with merge to ensure we don't overwrite existing profile data like displayName
    await userRef.set({
      uid: user.uid,
      email: user.email,
      role: ROLE_NAME,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isSuperAdmin: true // Extra flag for easy querying if needed
    }, { merge: true });

    console.log(`✅ Firestore Document 'users/${user.uid}' updated.`);
    console.log("---------------------------------------------------");
    console.log("🎉 SUCCESS: User is now a SUPER ADMIN.");
    console.log("---------------------------------------------------");
    console.log("⚠️  IMPORTANT: Please verify your Firestore Security Rules allow 'super_admin'.");
    console.log("   If your rules only check for 'admin', this user might be locked out.");
    
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ Error: User '${TARGET_EMAIL}' does not exist in Authentication.`);
      console.error("-> Please register this user via the frontend App first.");
    } else {
      console.error("❌ Unexpected Error:", error);
    }
  } finally {
    process.exit();
  }
}

promoteToSuperAdmin();
