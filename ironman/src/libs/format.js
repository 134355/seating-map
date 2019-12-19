/**
 * 时间格式化
 * @param {number||string} time  秒数
 * @param {string} type  格式类型，如'yyyy-MM-dd'
 */
function formatTime(time,type) {
    if(typeof time === 'string'){
        time = parseInt(time);
    }
    time = new Date(time);
    var o = {
        'M+' : time.getMonth()+1,                 //月份
        'd+' : time.getDate(),                    //日
        'h+' : time.getHours(),                   //小时
        'm+' : time.getMinutes(),                 //分
        's+' : time.getSeconds(),                 //秒
        'q+' : Math.floor((time.getMonth()+3)/3), //季度
        'S'  : time.getMilliseconds(),             //毫秒
        'A'  : (function(){
            if(time.getHours()<=12){
                return '上午'+time.getHours();
            }else{
                return '下午'+(time.getHours()-12);
            }
        })()
    };
    // debugger
    if(/(y+)/.test(type))
        type=type.replace(RegExp.$1, (time.getFullYear()+'').substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp('('+ k +')').test(type))
    type = type.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
    return type;
}

/**
 *  判断是否为空
 * @param {any} value 需要判断的值
 */
function isEmpty(value) {
    if(!value){
        return true;
    }
    if(Array.isArray(value)&&value.length===0){
        return true;
    }
    if(typeof value ==='object'&&JSON.stringify(value)==='{}'){
        return true;
    }
    return false;
}

export {formatTime,isEmpty};

