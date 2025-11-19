import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

const AppImage = ({ className }: Props) => {
	return (
		<Image
			width={512}
			height={512}
			alt="App Image"
			src="/app-image.svg"
			className={cn(`size-full`, className)}
		/>
	);
};

export default AppImage;
