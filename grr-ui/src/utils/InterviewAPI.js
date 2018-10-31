import axios from 'axios';
import {API_URL} from "../templates/api.config";
import { firebaseAuth } from './firebase'
var _ = require("lodash");
    

//Takes in an interview object
function createInterview(data){
    return firebaseAuth.currentUser.getIdToken(true).then((token) => {
        let config = {headers: {Authorization: `Bearer + ${token}`}};
        return axios.post(API_URL + '/api/interviews', { data }, config).then((response) => {
            console.log('Interview created response');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    })
}

//returns all interviews for user. takes in host
function getAllInterviews(id){
    return firebaseAuth.currentUser.getIdToken(true).then((token) => {
        let config = {headers: {Authorization: `Bearer + ${token}`}};
        return axios.get(API_URL + `/api/interviews/${id}`
        , config).then((response) => {
            console.log('Got all interviews for host response');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    })
}

//takes in updated interview object
function updateInterview(data){
    return firebaseAuth.currentUser.getIdToken(true).then((token) => {
        let config = {headers: {Authorization: `Bearer + ${token}`}};
        return axios.put(API_URL + `/api/interviews/`, { data }, config).then((response) => {
            console.log('Update interview result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    })
}

//will work same as interview object
function deleteInterview(data){
    return firebaseAuth.currentUser.getIdToken(true).then((token) => {
        let config = {headers: {Authorization: `Bearer + ${token}`}};
        return axios.delete(API_URL + `/api/interviews/`, { data }, config).then((response) => {
            console.log('Delete interview result');
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        });
    })
}

export default {
    createInterview, getAllInterviews, updateInterview, deleteInterview
}
