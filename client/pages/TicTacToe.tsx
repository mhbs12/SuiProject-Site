import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCurrentAccount, useSuiClientContext } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";
import { SUI_PACKAGES } from "@/lib/env";

function parseSui(value: string) {
  const n = Number(value);
  if (!isFinite(n) || n <= 0) return null;
  return n;
}

export default function TicTacToePage() {
  const account = useCurrentAccount();
  const connected = Boolean(account?.address);

  const [createAmount, setCreateAmount] = useState("");
  const [joinAmount, setJoinAmount] = useState("");
  const [joinId, setJoinId] = useState("");

  const onCreate = () => {
    if (!connected) {
      toast({ title: "Connect your wallet first" });
      return;
    }
    const amt = parseSui(createAmount);
    if (amt == null) {
      toast({ title: "Enter a valid SUI amount (> 0)" });
      return;
    }
    const roomId = Math.random().toString(36).slice(2, 10);
    toast({ title: "Room created", description: `ID: ${roomId} • Stake: ${amt} SUI` });
  };

  const onJoin = () => {
    if (!connected) {
      toast({ title: "Connect your wallet first" });
      return;
    }
    const amt = parseSui(joinAmount);
    if (amt == null || !joinId.trim()) {
      toast({ title: "Enter a valid room ID and SUI amount" });
      return;
    }
    toast({ title: "Joining room", description: `ID: ${joinId} • Stake: ${amt} SUI` });
  };

  const { network } = useSuiClientContext();
  const pkg = network === "mainnet" ? SUI_PACKAGES.mainnet : SUI_PACKAGES.testnet;

  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">TicTacToe</h1>
            <p className="mt-2 text-sm text-muted-foreground">Create a room and set a stake in SUI, or join an existing room with its ID.</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1 text-xs">
              <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-primary">{network}</span>
              <span className="text-foreground/70">Package:</span>
              <code className="font-mono text-foreground/80">{pkg || "not set"}</code>
            </div>
          </div>
          <Link to="/" className="text-sm text-foreground/70 hover:text-primary">← Back to games</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Create room</h2>
            <p className="mt-1 text-sm text-muted-foreground">Set the stake and create a new room.</p>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="create-amount">Stake (SUI)</Label>
                <Input id="create-amount" inputMode="decimal" placeholder="e.g. 1.5" value={createAmount} onChange={(e) => setCreateAmount(e.target.value)} />
              </div>
              <Button onClick={onCreate} className="w-full">Create Room</Button>
              {!connected && (
                <p className="text-xs text-muted-foreground">You must connect your wallet before creating a room.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Join room</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enter the room ID and your matching stake.</p>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="room-id">Room ID</Label>
                <Input id="room-id" placeholder="e.g. ab12cd34" value={joinId} onChange={(e) => setJoinId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-amount">Stake (SUI)</Label>
                <Input id="join-amount" inputMode="decimal" placeholder="e.g. 1.5" value={joinAmount} onChange={(e) => setJoinAmount(e.target.value)} />
              </div>
              <Button onClick={onJoin} className="w-full" variant="secondary">Join Room</Button>
              {!connected && (
                <p className="text-xs text-muted-foreground">You must connect your wallet before joining a room.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
