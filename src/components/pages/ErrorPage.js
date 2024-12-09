import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return(
        <div>
            <h1> This is Error Page </h1>
            <div>Error status: {error.statusText}</div>
            <div>Error Message: {error.message}</div>
        </div>
    );
}