import TermDepositForm from "./components/TermDepositForm";
import "./App.css";

function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>BEN Term Deposit Calculator</h1>
        <p>
          Calculate your potential term deposit returns
          based on your investment preferences.
        </p>
      </header>

      <TermDepositForm />

      <footer className="app-footer">
        <p>Term Deposit Calculator | Bendigo Bank Assessment</p>
      </footer>
    </main>
  );
}

export default App;