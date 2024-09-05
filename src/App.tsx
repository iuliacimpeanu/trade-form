import './App.css'
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DappProvider } from "@multiversx/sdk-dapp/wrappers";
import { NotificationModal, SignTransactionsModals, TransactionsToastList } from '@multiversx/sdk-dapp/UI';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Unlock } from './pages/Unlock';
import { Nav } from './components/Nav';
import { TradeForm } from './pages/Trade';

function App() {


  return (
    <DappProvider
    environment={EnvironmentsEnum.devnet}
    customNetworkConfig={{
      name: 'customConfig',
      walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8',
    }}
    dappConfig={{
      logoutRoute: '/unlock'
    }}
  >
      <Router>
        <Nav />
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals />
          <Routes>
            <Route path='/unlock' element={<Unlock />} />
            <Route path='/trade' element={<TradeForm />} />
          </Routes>
      </Router>
  </DappProvider>
  );
}

export default App
