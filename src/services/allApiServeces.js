import axios from "axios";




let userId = JSON.parse(localStorage.getItem("user")).userId


export class adminPanalApiServices {

    static baseURL = "https://culinary-ijbc.vercel.app";

    static createPost = (bodyData) => {

        console.log(bodyData)

        let userUrl = `${this.baseURL}/api/createposts`;

        return axios.post(userUrl,bodyData);
    };


    static editPost = (bodyData) => {

        let userUrl = `${this.baseURL}/api/createposts`;

        return axios.post(userUrl,bodyData);
    };

    
    static getUserProfile = () => {
        const userUrl =` ${this.baseURL}/api/getUsersdetails?user_id=${userId}`;
        return axios.get(userUrl,{});
    };
    static getNotifications = () => {
        const userUrl = `${this.baseURL}/api/getnotifications?user_id=${userId}`;
        return axios.get(userUrl,{});
    };


}
