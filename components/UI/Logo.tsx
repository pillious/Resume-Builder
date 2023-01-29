import Image from "next/image";

interface IProps {
    height: number;
    width: number;
    style?: React.CSSProperties;
}

const Logo: React.FC<IProps> = (props) => {
    return (
        <Image
            src="/logo.svg"
            alt="logo"
            height={props.height}
            width={props.width}
            style={props.style}
        />
    );
};

export default Logo;
