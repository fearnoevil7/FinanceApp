import { createContext } from "react";

type UserContextType = any;
const UserContext = createContext<UserContextType>({});


export default UserContext;