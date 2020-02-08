import React, {useState} from 'react';
import { withAuthorization } from '../Session';
import { FirebaseContext } from '../Firebase';

const Home = () => {

  const [reports,setReports] = useState({});
  

  return(
    <div>
    <FirebaseContext.Consumer>
    {firebase => {
      firebase.db.collection("reports")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      return setReports(data)
    })
    }  
  }
  </FirebaseContext.Consumer>

    <p>{JSON.stringify(reports)}</p>
  </div>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);