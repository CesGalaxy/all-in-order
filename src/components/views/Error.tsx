import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import serverDownImage from "@/assets/pictures/server_down.svg";

export interface ErrorViewProps {
    message: string;
}

export default function Error({ message }: ErrorViewProps) {
    return <Blank title={"Ups!"} content={message} image={serverDownImage} alt="An error ocurred">
        <Button as={Link} href="/">Go to home</Button>
    </Blank>
}