import { Button } from "@/components/ui/button";
import { useCurrentAccount, useSuiClientContext } from "@mysten/dapp-kit";
import { SUI_PACKAGES } from "@/lib/env";
import { toast } from "@/hooks/use-toast";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function MintOgNftButton({ className, size = "md" }: Props) {
  const account = useCurrentAccount();
  const { network } = useSuiClientContext();
  const connected = Boolean(account?.address);
  const pkg = network === "mainnet" ? SUI_PACKAGES.mainnet : SUI_PACKAGES.testnet;

  const disabled = !connected || !pkg;
  const label = "Mint OG NFT";

  const onClick = () => {
    if (!connected) {
      toast({ title: "Connect your wallet to mint" });
      return;
    }
    if (!pkg) {
      toast({ title: "Package ID not set", description: `Set VITE_SUI_PACKAGE_${network.toUpperCase()} in envs.` });
      return;
    }
    // Placeholder action: inform mint flow entry.
    toast({ title: "Mint flow ready", description: `Using package: ${pkg}` });
  };

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={className}
      size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
    >
      {label}
    </Button>
  );
}
