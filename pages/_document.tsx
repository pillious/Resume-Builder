import { Html, Head, Main, NextScript } from "next/document";

const Document: React.FC = () => {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/logo.svg" type="image/x-icon" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
