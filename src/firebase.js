import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAfiePNn4O-5W5sscf3P-OLS9DY8QhfrUk',
  authDomain: 'react-notes-fa185.firebaseapp.com',
  databaseURL: 'https://react-notes-fa185.firebaseio.com',
  storageBucket: 'react-notes-fa185.appspot.com',
};
firebase.initializeApp(config);

export function fetchNotes(callback, boardId) {
  firebase.database().ref(`boards/${boardId}/notes`).on('value', (snapshot) => {
    callback(snapshot);
  });
}

export function fetchNoteBoards(callback) {
  firebase.database().ref('boards').on('value', (snapshot) => {
    callback(snapshot);
  });
}

export function pushNoteBoard(noteboard) {
  firebase.database().ref('boards').push(noteboard);
}

// export function newBoard() {
//   firebase.database().ref('/boards/1/notes/').push({ notes: 'a note' });
// }

export function pushNote(note, boardId) {
  firebase.database().ref(`/boards/${boardId}/notes`).push(note);
}

export function deleteNote(noteId, boardId) {
  firebase.database().ref(`/boards/${boardId}/notes`).child(noteId)
  .remove();
}

export function editNoteContents(noteId, boardId, newContents, height, width) {
  const updates = {};
  updates[`/boards/${boardId}/notes/${noteId}/text`] = newContents;
  updates[`/boards/${boardId}/notes/${noteId}/height`] = height;
  updates[`/boards/${boardId}/notes/${noteId}/width`] = width;

  return firebase.database().ref().update(updates);
}

export function editNotePosition(noteId, boardId, x, y) {
  const updates = {};
  updates[`/boards/${boardId}/notes/${noteId}/x`] = x;
  updates[`/boards/${boardId}/notes/${noteId}/y`] = y;

  return firebase.database().ref().update(updates);
}
