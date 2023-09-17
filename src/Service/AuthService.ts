import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseSetting";

export class AuthService {

    /**
     * ログインする
     * @param user ログインユーザ情報（メール、パスワード）
     * @returns ログイン結果
     */
    async signIn(user: { email: string, password: string }): Promise<string> {
        try {
            await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password,
            )
            return "Sucessfull";
        } catch (e) {
            console.error(e);
            return "error";
        }
    }

    async signUp(user: { email: string, password: string }): Promise<string | undefined> {
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password,
            )
            return result.user.uid;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async signOut() {
        await signOut(auth);
        console.log("sign out sucessfull")
    }
}