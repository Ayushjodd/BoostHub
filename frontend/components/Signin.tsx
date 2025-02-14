import Login from "./Login";
import { cookies } from "next/headers";
import NoPage from "./NoPage";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/utils/conf";

export default function Signin() {
    const token = cookies().get("token");
    const value = token?.value || "";

    let isLoggedIn = false;

    if (value) {
        try {
            const res = jwt.verify(value, JWT_SECRET);
            if (res) {
                isLoggedIn = true;
            }
        } catch (error) {
            console.error("Token verification error:");
        }
    }

    if (isLoggedIn) {
        return <NoPage label="You are Logged In, Please" choice="Logout" route="home" />;
    }

    return <Login />;
}
