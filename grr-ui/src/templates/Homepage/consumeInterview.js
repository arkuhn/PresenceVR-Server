import axios from 'axios';
import {API_URL} from "../api.config";
var _ = require("lodash");

class ConsumeInterview {
    
    //individual interview call. not sure if we need
    getInterview(id){
        axios.get(API_URL + `/api/interviews/${id}`).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //Takes in an interview object
    createInterview(data){
        axios.post(API_URL + '/api/interviews', { data }).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //returns all interviews for user. takes in host
    getAllInterviews(id){
        axios.get(API_URL + '/api/interviews', {
            id: id
        }).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //takes in updated interview object
    updateInterview(id){
        axios.put(API_URL + `/api/interviews/${id}`).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //will work same as interview object
    cancelInterview(id){
        axios.delete(API_URL + `/api/interviews/${id}`).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }
} export default ConsumeInterview;