import { Client, Account, ID } from "appwrite";
import { config } from "../config/config";
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return userAccount;
      }
    } catch (error) {
      console.log("Services :: Auth :: createAccount() :: Error", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );

      if (session) {
        return session;
      }
    } catch (error) {
      console.log("Services :: Auth :: login() :: Error", error);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();

      if (currentUser) {
        return currentUser;
      }
    } catch (error) {
      // console.log("Services :: Auth :: getCurrentUser() :: Error", error);
      console.log("User not loggedIn");
    }

    return null;
  }

  async logout() {
    try {
      const session = await this.account.deleteSession("current");

      if (session) {
        return session;
      }
    } catch (error) {
      console.log("Services :: Auth :: logout() :: Error", error);
    }
  }

  // Updating Account
  async updateName({ name }) {
    try {
      const updatedUser = await this.account.updateName(name);

      if (updatedUser) {
        return updatedUser;
      }
    } catch (error) {
      console.log("Services :: Auth :: updateName() :: Error", error);
    }
  }

  async updateEmail({ email, password }) {
    try {
      const updatedUser = await this.account.updateEmail(email, password);

      if (updatedUser) {
        return updatedUser;
      }
    } catch (error) {
      console.log("Services :: Auth :: updateEmail() :: Error", error);
    }
  }

  async updatePassword({ oldPassword, password }) {
    try {
      const updatedUser = await this.account.updatePassword(
        password,
        oldPassword
      );

      if (updatedUser) {
        return updatedUser;
      }
    } catch (error) {
      console.log("Services :: Auth :: updatePassword() :: Error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
