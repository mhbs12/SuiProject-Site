import { Link } from "react-router-dom";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand to-primary text-white shadow-sm">
            SG
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            SuiGameCenter
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <ConnectWalletButton />
        </nav>
      </div>
    </header>
  );
}
