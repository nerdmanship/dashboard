# Personal Finance Dashboard

Personal finance tracker built with Next.js and Firebase, deployed at [dashboard.johan.wtf](https://dashboard.johan.wtf).

## Features
- Google Authentication
- Transaction tracking (income, expenses, savings)
- Multi-currency support (USD, EUR, SEK)

## Local Development

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Firebase Setup
1. Enable Google Auth in Firebase Console
2. Add domain to authorized domains
3. Set Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{transactionId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Run Locally
```bash
npm install
npm run dev
```

## Planned Features
- [ ] Transaction editing
- [ ] Sorting and filtering
- [ ] Data visualization
- [ ] Recurring transactions
