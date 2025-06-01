import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className={cn("relative rounded-md flex flex-col", className)}>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </Button>
      </div>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";
