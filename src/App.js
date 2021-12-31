import logo from './logo.svg';
import {Provider} from 'react-redux'
import Store from './redux/cake/Store';
import './App.css';
import CakeContainer from './components/CakeContainer';
import HooksCakeContainer from './components/HooksCakeContainer';
import IceCreamContainer from './components/IceCreamContainer';
import ActionPayloadCakeContainer from './components/ActionPayloadCakeContainer';
import ItemContainer from './components/ItemContainer';
import Example from './components/Example';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <h3> React-Redux Example</h3>
    <h2 style={{color:'red'}}>Example without Hooks addition Byeeee.. </h2>
      <CakeContainer/>
      <IceCreamContainer/>
      {/* <ItemContainer cake/>
      <ItemContainer/> */}
      <h2 style={{color:'red'}}>Example with Hooks</h2>
      <HooksCakeContainer/>
      <h2 style={{color:'red'}}>Action payload</h2>
      <ActionPayloadCakeContainer/>
    </div>
    </Provider>
  //  <div>
  //    <Example/>
  //  </div>
  );
}

export default App;
