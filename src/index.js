import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCbl-Bao0ZCb5Z_vUl09eONAiU5nY-P6xo",
    authDomain: "fir-9-6e433.firebaseapp.com",
    projectId: "fir-9-6e433",
    storageBucket: "fir-9-6e433.appspot.com",
    messagingSenderId: "742632653748",
    appId: "1:742632653748:web:5bdedea2af679b7c5728e1"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

// get collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })      
//         })

//         console.log(books);
//     })
//     .catch (err => {
//         console.log(err);
//     })


// get real time collection data 
onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })      
    })

    console.log(books);
})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})