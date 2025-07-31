import React, { useState, useEffect } from "react";
import { TitleBar, Cursor, Button, List, Frame } from "@react95/core";
import { Filexfer128, Computer3, User, Progman34, CdMusic, BatExec2, Mspaint, HelpBook } from "@react95/icons";
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import * as S from "./layoutStyling";
import styled from "styled-components";

const WalletContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ConnectorButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: 12px;
  margin-bottom: 8px;
`;

const WalletInfo = styled.div`
  background: #c0c0c0;
  border: 2px inset #c0c0c0;
  padding: 12px;
  margin-bottom: 16px;
`;

const AddressText = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  word-break: break-all;
  margin-bottom: 8px;
`;

function CV({ closeCV }) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
    enabled: !!address && isConnected,
  });
  const [connectionError, setConnectionError] = useState(null);
  const [showError, setShowError] = useState(false);

  // 清除错误状态
  useEffect(() => {
    if (isConnected) {
      setShowError(false);
      setConnectionError(null);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!error) {
      setConnectionError(null);
    }
  }, [error]);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getConnectorIcon = (connectorName, index) => {
    const icons = [Computer3, User, Progman34, CdMusic, BatExec2, Mspaint, HelpBook];
    const iconMap = {
      'injected': Computer3,
      'metamask': User,
      'walletconnect': Progman34,
      'coinbase': CdMusic,
      'coinbase wallet': CdMusic,
    };
    
    return iconMap[connectorName.toLowerCase()] || icons[index % icons.length];
  };

  const getConnectorEmoji = (name) => {
    if (name.toLowerCase().includes('metamask')) return '🦊';
    if (name.toLowerCase().includes('walletconnect')) return '🔗';
    if (name.toLowerCase().includes('coinbase')) return '🔵';
    if (name.toLowerCase().includes('injected')) return '💼';
    return '🔗';
  };

  const handleConnectorClick = async (connector) => {
    try {
      setShowError(false);
      setConnectionError(null);

      if (!connector) {
        throw new Error('连接器不可用');
      }

      await connect({ connector });
    } catch (err) {
      console.error('连接失败:', err);

      let errorMessage = '连接失败，请重试';

      if (err.message?.includes('User rejected')) {
        errorMessage = '用户取消了连接请求';
      } else if (err.message?.includes('No provider')) {
        errorMessage = '未检测到钱包，请安装 MetaMask 或其他钱包';
      } else if (err.message?.includes('Already processing')) {
        errorMessage = '正在处理连接请求，请稍候';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setConnectionError(errorMessage);
      setShowError(true);
    }
  };

  return (
    <S.styledModal
      icon={<Filexfer128 variant="16x16_4" />}
      title={"连接钱包"}
      titleBarOptions={[
        <S.styledModal.Minimize key="minimize" />,
        <TitleBar.Close onClick={closeCV} key="close" />,
      ]}
      height="100%"
    >
      <S.styledModalFrame bg="white" boxShadow="$in">
        <WalletContainer>
          {isConnected ? (
            <>
              <WalletInfo>
                <h3>钱包已连接</h3>
                <AddressText>
                  <strong>地址:</strong> {formatAddress(address)}
                </AddressText>
                <AddressText style={{ fontSize: '10px', color: '#666' }}>
                  完整地址: {address}
                </AddressText>
              </WalletInfo>
              <Button
                onClick={() => {
                  console.log('断开连接按钮被点击');
                  disconnect();
                }}
                variant="menu"
                size="lg"
                disabled={isDisconnecting}
              >
                {isDisconnecting ? '断开中...' : '断开连接'}
              </Button>
            </>
          ) : (
            <>
              <h2>选择钱包连接</h2>
              <div>
                {connectors.map((connector) => (
                  <ConnectorButton
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                    variant="menu"
                    size="lg"
                  >
                    <Computer3 variant="16x16_4" style={{ marginRight: '8px' }} />
                    {connector.name}
                    {isPending && ' (连接中...)'}
                  </ConnectorButton>
                ))}
              </div>
            </>
          )}
        </WalletContainer>
      </S.styledModalFrame>
    </S.styledModal>
  );
}

export default CV;
