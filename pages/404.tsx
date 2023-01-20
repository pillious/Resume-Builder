import ErrorPage from "../components/UI/ErrorPage";

const Custom404: React.FC = () => {
    return <ErrorPage statusCode={404} message="Page not found." />;
};

export default Custom404;
