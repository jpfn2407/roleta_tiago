import { SlotMachineProvider } from './context/SlotMachineContext.jsx';
import { SlotMachine } from './components/SlotMachine.jsx';
import { RotateMessage } from './components/RotateMessage.jsx';
import './App.css';

function App() {
  return (
    <SlotMachineProvider>
      <RotateMessage />
      <SlotMachine />
    </SlotMachineProvider>
  );
}

export default App;
