import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import { Link } from "react-router-dom";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";

const callbackUrl = `${window.location.origin}/unlock`;

export const Nav = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    sessionStorage.clear();
    logout(callbackUrl, undefined, false);
  };

  return (
    <header className="flex flex-row align-center justify-end pl-6 pr-6 pt-6 bg-xExchange-Neutral/900 ">
      <nav className="h-full w-full text-sm sm:relative left-auto right-0 sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent">
        <div className="flex justify-end container mx-auto items-center gap-2">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <Link to="/">
              <p className="text-xExchange-Neutral/200 ">{EnvironmentsEnum.devnet}</p>
            </Link>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-xExchange-Neutral/200  hover:text-white mx-0"
            >
              Close
            </button>
          ) : (
            <Link to="/unlock" className="inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-xExchange-Neutral/200  hover:text-white mx-0">Connect</Link>
          )}
        </div>
      </nav>
    </header>
  );
};
