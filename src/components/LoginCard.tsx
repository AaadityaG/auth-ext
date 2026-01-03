import React, { useState } from "react";
import { Lock, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { AuthInput } from "./AuthInput";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";

interface LoginCardProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

export function LoginCard({ onLogin }: LoginCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    try {
      await onLogin(username, password);
    } catch (error) {
      // Error is handled in App.tsx
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100 animate-scale-in">
      <Card className="bg-card rounded-2xl shadow-card">
        <CardContent className="p-8 space-y-6">
          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-1">
            <p className="font-bold text-3xl text-foreground">Edvi Login</p>
            <p className="text-sm font-semibold text-muted-foreground">Please Log In To Continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              icon={<User className="w-5 h-5" />}
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />

            <AuthInput
              icon={<Lock className="w-5 h-5 " />}
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full mt-6 !bg-blue-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}