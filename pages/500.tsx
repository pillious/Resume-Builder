import ErrorPage from "../components/UI/ErrorPage";

const Custom500: React.FC = () => {
    return <ErrorPage statusCode={500} message="An error occurred." />;
};

export default Custom500;
