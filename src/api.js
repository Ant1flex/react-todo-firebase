import { db, auth } from './firebase'

export function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log('USER LOGGED IN'))
    .catch((error) => {
      console.log(error)
    });
}

export function logoutUser() {
  auth.signOut()
    .then(() => console.log('USER LOGGED OUT'))
    .catch((error) => {
      console.log(error)
    });
}

export function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => console.log('USER CREATED'))
    .catch((error) => {
      console.log(error)
    });
}

export function onAuth(handleAuth) {
  auth.onAuthStateChanged(handleAuth);
}

export function getLists(userId) {
  return db.collection('lists')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return items
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export function getTodos(userId) {
  return db.collection('todos')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return items
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

// export function getPlannedTodos(userId) {
//   return db.collection('todos')
//     .where('userId', '==', userId)
//     .where('date', '>=', Date.now()/1000)
//     .get()
//     .then((snapshot) => {
//       const items = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       return items
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
// }

export function getListTodos(listId) {
  return db.collection('todos')
    .where('listId', '==', listId)
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return items
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export function addTask(data) {
  return db.collection('todos').add({
    listId: '',
    completed: false,
    notes: '',
    date: null,
    steps: [],
    ...data,
  }).then(docRef => {
    return docRef.get()
  }).then(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export function updateTask(todoId, data) {
  return db.collection('todos').doc(todoId).update(data)
    .then(() => ({
      id: todoId,
      ...data
    }))
}

export function deleteTask(todoId) {
  return db.collection('todos').doc(todoId).delete()
    .then(() => todoId)
}



// export function get(collectionName) {

//   const collection = db.collection(collectionName)

//   return (query = () => collection) => {
//     return query(collection)
//       .get()
//       .then((snapshot) => {
//         const items = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         return items
//       })
//       .catch((error) => {
//         console.log("Error getting documents: ", error);
//       });
//   }
// }