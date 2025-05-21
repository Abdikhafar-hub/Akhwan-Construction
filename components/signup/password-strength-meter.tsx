"use client"

import { Progress } from "@/components/ui/progress"

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  // Calculate password strength
  const getPasswordStrength = (password: string): number => {
    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25

    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25

    return strength
  }

  const strength = getPasswordStrength(password)

  const getStrengthLabel = (strength: number): string => {
    if (strength <= 25) return "Weak"
    if (strength <= 50) return "Fair"
    if (strength <= 75) return "Good"
    return "Strong"
  }

  const getStrengthColor = (strength: number): string => {
    if (strength <= 25) return "bg-red-500"
    if (strength <= 50) return "bg-yellow-500"
    if (strength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span>Password strength:</span>
        <span
          className={
            strength <= 25
              ? "text-red-500"
              : strength <= 50
                ? "text-yellow-500"
                : strength <= 75
                  ? "text-blue-500"
                  : "text-green-500"
          }
        >
          {getStrengthLabel(strength)}
        </span>
      </div>
      <Progress value={strength} className={`h-1 ${getStrengthColor(strength)}`} />
      <p className="text-xs text-muted-foreground">Use 8+ characters with a mix of letters, numbers & symbols</p>
    </div>
  )
}
