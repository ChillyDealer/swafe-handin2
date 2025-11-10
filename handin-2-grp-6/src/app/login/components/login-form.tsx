import { Lock, User } from "lucide-react";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      
      {/* email */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-xs">Email</label>
        <div className="flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2">
          <User className="text-gray-400" size={18} />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1"
            required
          />
        </div>
      </div>

      {/* password */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-xs">Password</label>
        <div className="flex items-center bg-[#3a3a3a] rounded-md px-3 py-2 gap-2">
          <Lock className="text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1"
            required
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 px-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#6b9b4c] hover:bg-[#5a8a3b] text-white font-semibold py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Logging in..." : "LOGIN"}
      </button>
    </form>
  );
}
