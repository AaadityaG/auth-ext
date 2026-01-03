import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
          <input
            className={`flex h-12 w-full rounded-lg border border-input bg-card pl-12 pr-4 text-sm shadow-input transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";