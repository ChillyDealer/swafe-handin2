import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-10"
        >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to the lobby</span>
        </button>
    );
}
