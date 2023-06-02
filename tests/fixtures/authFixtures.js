export const initialState = {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: '123',
  email: 'demo@gmail.com',
  displayName: 'Demo',
  photoURL: 'https://demo.com/photo.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: '123',
  email: 'demo@google.com',
  displayName: 'Demo',
  photoURL: 'https://demo.com/photo.jpg',
};
