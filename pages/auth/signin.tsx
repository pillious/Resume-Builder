import { GetServerSideProps, GetServerSidePropsResult } from "next";
import {
    getProviders,
    signIn,
    getSession,
} from "next-auth/react";
import { Provider } from "next-auth/providers";

interface IProps {
    providers: Provider[];
}

const SignIn: React.FC<IProps> = ({ providers }) => {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </>
    );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (
    context
): Promise<GetServerSidePropsResult<{ [key: string]: unknown }>> => {
    const { req } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    return {
        props: {
            providers: await getProviders(),
        },
    };
};