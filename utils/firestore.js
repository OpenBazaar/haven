// firebase.js
import Firestore from '@react-native-firebase/firestore';

const ref = Firestore().collection('peer_token');

export const addPeerToTokenMap = async (uid, peerID, token) => {
  await ref.doc(peerID).set({ token, uid });
};
