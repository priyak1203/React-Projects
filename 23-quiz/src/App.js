import Question from './components/Question';
import SetupForm from './components/SetupForm';
import Loading from './components/Loading';
import { useGlobalContext } from './context';

function App() {
  const { isLoading, waiting } = useGlobalContext();

  return (
    <main>
      {waiting ? <SetupForm /> : isLoading ? <Loading /> : <Question />}
    </main>
  );
}

export default App;
