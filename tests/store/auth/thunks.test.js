import { clear } from 'localforage';
import {
  loginWithEmailPassword,
  logoutFirebase,
  signIngWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingAuth,
  checkingCredentials,
  login,
  logout,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth';
import { demoUser } from '../../fixtures/authFixtures';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';

jest.mock('../../../src/firebase/providers');

describe('Test on AuthThunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('should invoke checkingCredentials', async () => {
    await checkingAuth()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('should invoke checkingCredentials and Login - Success', async () => {
    const loginData = { ok: true, ...demoUser };
    await signIngWithGoogle.mockResolvedValue(loginData);
    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should invoke checkingCredentials and logOut - Error message', async () => {
    const loginData = { ok: false, errorMessage: 'Google Error' };
    await signIngWithGoogle.mockResolvedValue(loginData);
    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithEmailPassword should call checkingCredentials and login() - Success', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLogOut should call logoutFirebase, clearNotes and logout() ', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
