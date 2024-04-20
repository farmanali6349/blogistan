import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.url)
            .setProject(config.projectId);
        
        this.account = new Account(this.client);
    }


    async signup({email, password, name}) {
        try {
            return await this.account.create(ID.unique(), email, password, name)
        } catch (error) {
            console.log("AuthService :: signup() :: Error ", error);
            return false;
        }
    }

    async signin({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AuthService :: login() :: Error ", error);
            return false;
        }
    }

    async getCurrentUser({email, password}) {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService :: getCurrentUser() :: Error ", error);
            return false;
        }
    }

    async signout({email, password}) {
        try {
            return await this.account.deleteSession();
        } catch (error) {
            console.log("AuthService :: signout() :: Error ", error);
            return false;
        }
    }


}

const authService = new AuthService();

export {authService}