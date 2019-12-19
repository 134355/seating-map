import {
    getUserInfo
} from '../api';

export default {
    updateUserInfo({commit,state}){
        getUserInfo().then(({data})=>{
            console.log(data);
            if(data.code===0){
                commit('updateUserInfo',data.data);
            }
        });
    }
}