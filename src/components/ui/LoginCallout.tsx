import LoginButton from "@components/ui/Button/LoginButton";

interface Props {
    text: string;
}

const LoginCallout = ({ text }: Props) => {
    return (
        <div className="flex flex-col w-full items-center justify-center text-center py-20 gap-5">
            <p className="text-lg">{text}</p>
            <LoginButton/>
        </div>
    );
};

export default LoginCallout;