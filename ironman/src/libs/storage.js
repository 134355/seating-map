const localStorage = window.localStorage;

var storage = {
    /**
     * 设置 localStorage
     * @param {string} key 键
     * @param {Object} value 值
    */
    set:function(key, value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    /**
     * 获取 localStorage
     * @param {string} key 键
     */
    get: function(key) {
        try{
            return JSON.parse(localStorage.getItem(key))
        }catch(err){
            return '';
        }
        
    },
    /**
     * 清除 localStorage
     * @param {string} key 键
     */
    remove(key){
        localStorage.removeItem(key);
    }
};

export default storage;

