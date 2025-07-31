import Desktop from "./components/desktop";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/storm.css";
import { ClippyProvider } from "@react95/clippy";
import { Cursor } from "@react95/core";
import Clippy from "./components/clippy";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ClippyProvider agentName="Rover">
            <Clippy />
            <Desktop className={Cursor.Auto} />
          </ClippyProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
