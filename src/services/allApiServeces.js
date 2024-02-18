import axios, { AxiosRequestConfig } from 'axios';



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



}
