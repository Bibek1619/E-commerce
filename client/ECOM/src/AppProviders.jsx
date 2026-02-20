import { CartProvider } from "./components/providers/cart-provider";
import { SignupProvider } from "./components/providers/SignupProvider";
import UserProvider from "@/components/providers/UserProvider"

const AppProviders = ({ children }) => {
  return (
    <UserProvider> {/* ✅ Add it here */}
      <SignupProvider>
        <CartProvider>{children}</CartProvider>
      </SignupProvider>
    </UserProvider>
  );
};

export default AppProviders;
