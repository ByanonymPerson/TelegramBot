import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';

function App() {
  const {tg, user , onClose , onToggleButton} = useTelegram();

      useEffect(() => {
      tg.ready();
      }, [])

  return (
    <div className="App">
      <Header/>
     <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
