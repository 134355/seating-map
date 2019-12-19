import _ from '../libs/util';

function get(url,param) {
    return _.ajax.get(url,{param:param});
}
function post(url,param) {
    return _.ajax.post(url,param);
}

export const getUserInfo = (param)=>{return get('/me',param);};
export const login = (param)=>{return post('/login',param);};
export const logout = (param)=>{return post('/logout',param);};