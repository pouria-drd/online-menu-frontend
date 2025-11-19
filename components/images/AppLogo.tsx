import { cn } from "@/lib/utils";
import AppImage from "./AppImage";

interface Props {
	className?: string;
}

function AppLogo({ className }: Props) {
	return (
		<div className={cn("aspect-square w-10 h-10", className)}>
			<AppImage />
		</div>
	);
}

export default AppLogo;
