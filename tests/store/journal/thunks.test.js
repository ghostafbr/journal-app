import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  startNewNote,
} from '../../../src/store/journal';
import { FirebaseDB } from '../../../src/firebase/config';

describe('Test on Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should create a blank note', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    // delete from firebase

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const deletePromises = docs.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  });
});
