// src/lib/schema.js

// This is just a starting point - let's discuss what you need
export const TRANSACTION_SCHEMA = {
  type: ['income', 'expense', 'savings', 'debt'],
  categories: {
    income: ['salary', 'dividend', 'rsu', 'other'],
    expense: ['food', 'rent', 'transport', 'other'],
    savings: ['investment', 'emergency', 'other'],
    debt: ['credit', 'loan', 'other']
  },
  currencies: ['SEK', 'USD', 'EUR']
};

export const newTransaction = {
  type: 'expense',
  category: '',
  amount: '',
  currency: 'SEK',
  date: new Date().toISOString().split('T')[0],
  notes: ''
};
