import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  const {tg, user , onClose , onToggleButton} = useTelegram();

      useEffect(() => {
      tg.ready();
      }, [])

  return (
    <div className="App">
     <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
