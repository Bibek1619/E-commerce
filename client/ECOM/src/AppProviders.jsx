import { CartProvider } from "./components/providers/cart-provider";
import { SignupProvider } from "./components/providers/SignupProvider";
const AppProviders = ({ children }) => {
  return (
    
        <SignupProvider>
          <CartProvider>{children}</CartProvider>
        </SignupProvider>
    );
};

export default AppProviders;