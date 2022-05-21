import { useContext, useEffect } from 'react';
import UserContextProvider, { UserContext } from './context/UserContext';
import Intro from './Intro';
function App() {
  return <>
    <UserContextProvider>
      <Intro />
    </UserContextProvider>
  </>
}
export default App;
