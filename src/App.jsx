import { SlotMachineProvider } from './context/SlotMachineContext.jsx';
import { SlotMachine } from './components/SlotMachine.jsx';
import './App.css';

function App() {
  return (
    <SlotMachineProvider>
      <SlotMachine />
    </SlotMachineProvider>
  );
}

export default App;
