import { useNavigate } from "react-router-dom";
import {
  ExtensionLoginButton,
  ExtensionLoginButtonPropsType,
  LedgerLoginButton,
  LedgerLoginButtonPropsType,
  OperaWalletLoginButtonPropsType,
  WalletConnectLoginButton,
  WalletConnectLoginButtonPropsType,
  WebWalletLoginButton,
  WebWalletLoginButtonPropsType,
} from "@multiversx/sdk-dapp/UI";
import { AuthRedirectWrapper } from "../../wrappers/AuthRedirectWrapper";

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | ExtensionLoginButtonPropsType
  | WebWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const navigate = useNavigate();
  const commonProps: CommonPropsType = {
    callbackRoute: "/trade",
    nativeAuth: true,
    onLoginRedirect: () => {
      navigate("/trade");
    },
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
        <div className="flex justify-center items-center bg-black h-screen">
        <div
            className="flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-xExchange-Neutral/900 text-xExchange-Neutral/200"
            data-testid="unlockPage"
        >
            <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl">Login</h2>

            <p className="text-center">Choose a login method</p>
            </div>

            <div className="flex flex-col md:flex-row">
            <WalletConnectLoginButton
                loginButtonText="xPortal App"
                {...commonProps}
            />
            <LedgerLoginButton loginButtonText="Ledger" {...commonProps} />
            <ExtensionLoginButton
                loginButtonText="DeFi Wallet"
                {...commonProps}
            />
            <WebWalletLoginButton {...commonProps} />
            </div>
        </div>
        </div>
    </AuthRedirectWrapper>
  );
};
