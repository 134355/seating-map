
/**
 * 节流器
 * @param {回调函数} fun 
 * @param {延迟} delay 
 * @param {间隔} time 
 */
export function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            // fun.apply(context, args);(用于传参数)
            fun();
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(function(){
                // fun.apply(context, args);
                fun();
            }, delay);
        }
    };
}