import { createContext, useState, useMemo, useCallback } from "react";
import { guid } from "../custom2";

interface IProps {
    children: JSX.Element;
}

interface IAuthContext {
    userId: guid | null;
    updateUserId: (id: guid) => void;
}

const defaultValues: IAuthContext = {
    userId: null,
    updateUserId: () => ({}),
};

const AuthContext = createContext<IAuthContext>(defaultValues);

export const AuthContextProvider: React.FC<IProps> = (props) => {
    const [userId, setUserId] = useState(defaultValues.userId);

    const updateUserId = useCallback((id: guid) => setUserId(id), []);

    const contextValue = useMemo(
        () => ({
            userId,
            updateUserId,
        }),
        [userId, updateUserId]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
