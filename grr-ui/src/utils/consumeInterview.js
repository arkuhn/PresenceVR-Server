import axios from 'axios';
import {API_URL} from "../templates/api.config";
var _ = require("lodash");

class ConsumeInterview {
    
    //individual interview call. not sure if we need
    getInterview(id){
        return axios.get(API_URL + `/api/interviews/${id}`).then((response) => {
            console.log('got a result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //Takes in an interview object
    createInterview(data){
        return axios.post(API_URL + '/api/interviews', { data }).then((response) => {
            console.log('Interview created response');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //returns all interviews for user. takes in host
    getAllInterviews(id){
        return axios.get(API_URL + `/api/interviews/currentuser%40email.com`
        ).then((response) => {
            console.log('Got all interviews for host response');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //takes in updated interview object
    updateInterview(data){
        return axios.put(API_URL + `/api/interviews/`, { data }).then((response) => {
            console.log('Update interview result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }

    //will work same as interview object
    deleteInterview(data){
        return axios.delete(API_URL + `/api/interviews/`, { data }).then((response) => {
            console.log('Delete interview result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    }
} export default ConsumeInterview;