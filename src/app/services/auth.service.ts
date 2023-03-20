import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Firestore, collection, addDoc, collectionData, doc, query, where, getDocs } from '@angular/fire/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth,
    private firestore: Firestore,
  ){}

  async register(user : User){
    try {
      const newUser = await createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        const collectionInstance = collection(this.firestore,'users');
        addDoc(collectionInstance,{
          uid : uid,
          fullname : user.fullname,
          email : user.email,
          phone : user.phone,
        })
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  getAllUsers(){
    const collectionInstance = collection(this.firestore,'users');
    return collectionData(collectionInstance)
  }


  async login(email : string , password : string){
    try {
      const loginUser = await signInWithEmailAndPassword(this.auth, email, password)
      const usersCollectionInstance = collection(this.firestore, 'users')
      const q = query(usersCollectionInstance, where('uid', '==', loginUser.user.uid))
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const currentUser : any = {
            uid : loginUser.user.uid,
            email : loginUser.user.email,
            phone : doc.data()["phone"],
            fullname : doc.data()["fullname"],
            birthday : doc.data()["birthday"],
            photoUrl : doc.data()["photoUrl"],
          };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        });
      });
      // const currentUser : any = {
      //   id : loginUser.user.uid,
      //   email : loginUser.user.email,
      //   email: 'john@example.com',
      // };
      // id ?: string;
      // fullname : string;
      // birthday ?: Date;
      // email : string;
      // phone : string;
      // photoUrl ?: string;
      // password : string;
      // localStorage.setItem('user', JSON.stringify(user));

      return loginUser;
    } catch (error) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}
