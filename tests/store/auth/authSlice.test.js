import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
} from '../../fixtures/authFixtures';

describe('Test on AuthSlice', () => {
  test('should return the initial state and selfcall "auth"', () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });

  test('should login', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('should logout', () => {
    const state = authSlice.reducer(authenticatedState, logout());
  });

  test('should logout and show an error message', () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: 'Error message' })
    );
  });

  test('should chage the state to checkin', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
});
