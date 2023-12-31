import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//ek class banaya 
// then uss say class ko use karke ek object banaya 
// then new object ko export kar diya
// esse bas data export hua but logic frontend mea nahi gya 

export class AuthService{
    client = new client();
    account;
    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client)
        
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                return this.Login(email,password);
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async Login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
            

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authservice = new AuthService();

export default authservice;