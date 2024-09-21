import BlankView from "@/components/BlankView";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import serverDownImage from "@/assets/pictures/server_down.svg";

export interface ErrorViewProps {
    message: string;
}

export default function ErrorView({ message }: ErrorViewProps) {
    return <BlankView title={"Ups!"} content={message} image={serverDownImage} alt="An error ocurred">
        <Button as={Link} href="/">Go to home</Button>
    </BlankView>
}