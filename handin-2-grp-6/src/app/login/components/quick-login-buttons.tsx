interface QuickLoginButtonsProps {
    onQuickLogin: (email: string, password: string) => void;
}

const testUsers = [
    { label: "Manager", email: "gruppeseks_boss@fitness.dk", password: "asdfQWER", name: "Manager The Boss" },
    { label: "Trainer", email: "gruppeseks_m@fit.dk", password: "aQ", name: "Superman Mars" },
    { label: "Client", email: "gruppeseks_c1@fit.dk", password: "aA", name: "John Doe" },
];

export function QuickLoginButtons({ onQuickLogin }: QuickLoginButtonsProps) {
    return (
        <div className="border-t border-gray-600 pt-3 mt-2">
            <p className="text-gray-400 text-xs text-center mb-2">Quick Login</p>
            <div className="grid grid-cols-3 gap-1.5">
                {testUsers.map((user) => (
                    <button
                        key={user.email}
                        type="button"
                        onClick={() => onQuickLogin(user.email, user.password)}
                        className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white text-[10px] py-1.5 px-2 rounded transition-colors"
                        title={`${user.email} / ${user.password}`}
                    >
                        {user.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
