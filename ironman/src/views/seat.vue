<style scoped>
    .container {
        position: relative;
        margin: 0 auto;
        width: 1200px;
        overflow: hidden;
    }
    #map {
        width: 100%;
    }
    #map--shadow {
        display: none;
    }
    .selector {
        display: none;
        position: absolute;
        width: 0px;
        height: 0px;
        background-color: rgba(92, 173, 255, 0.5);
        color: #6b6b6b;
    }
    .selector span{
        position: absolute;
        top: 0; left: 0;
        line-height: 1;
    }
    .selector--ok {
        display: block;
        background-color: rgba(25, 190, 107, 0.5);
    }
    .activeSeat {
        background-color: rgba(255, 153, 0, 0.5) !important;
    }
    .seatBtn_wrap {
        display: -webkit-box;
        background-color: rgba(243, 243, 243, 0.44);
        border-radius: 10px;
        padding: 10px;
    }
    .seatNo {
        position: relative;
        margin: 5px 10px;
    }
    .seatBtn--select {
        background-color: #ff9900;
    }
    .seatBtn--success {
        background-color: #19be6b;
    }
    .seatBtn--close{
        position: absolute;
        top: 0; 
        right: 0;
        color: #5cadff;
    }
    .selector .seatBtn--close{
        cursor: pointer;
    }
    .seatBtn--close:hover{
        color: #ed3f14;
    }
    .download_btn{
        float: right;
        margin: 20px 0;
    }
</style>

<template>
    <div class="container">
        <img src="../image/base.png" alt="" id="map" />
        <img src="../image/base.png" alt="" id="map--shadow" />
        <div id="selector" class="selector"></div>
        <div class="selector  selector--ok"  v-for="item in list"  v-if="item.cord"  v-show="item.cord"
            :style="{top:item.cord.y+'px', left:item.cord.x+'px', width:item.cord.w+'px', height:item.cord.h+'px'}" 
            :class="[activeSeat === item&&item.cord?'activeSeat':'']" 
            :key="item.name"> <span>{{item.name}}</span>
            <Icon type="close-circled" class="seatBtn--close"  @click.stop.native="resetButton(item)"  v-if="item.cord"></Icon>
        </div>
        <div class="seatBtn_wrap">
            <Button :type="toggleButton(item)" v-for="item in list" class="seatNo" @click="selectSeat(item)" :key="item.name">{{item.name}}
                <Icon type="close-circled" class="seatBtn--close"  @click.stop.native="resetButton(item)"  v-if="item.cord"></Icon>
            </Button>
        </div>
        <Button type="primary" @click='output()'  class="download_btn">导出JSON文件</Button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                activeSeat: ''
            };
        },
        mounted: function() {
            var _this = this;
            //test
            var seatNo = ['30',
                '31',
                '32',
                '33',
                '34',
                '35',
                '36',
                '37',
                '38',
                '39',
                '50',
                '51',
                '52',
                '53',
                '55',
                '70',
                '71',
                '72',
                '73',
                '75',
                '76',
                '77',
                '78',
                '100',
                '101',
                '102',
                '103',
                '111',
                '222',
                '333',
                '555',
                '666',
                '777',
                '801',
                '802',
                '803',
                '805',
                '806',
                '807',
                '808',
                '809',
                '888',
                '999'];
            var newArr = [];
            seatNo.forEach(function(item, index, arr) {
                newArr.push({
                    name: item,
                    cord: ''
                });
            });
            this.list = newArr;
            console.log(this.list);
        },
        computed: {
            result: function() {
                var list = this.list;
                var res = [];
                list.forEach(function(ele, index, arr) {
                    res.push({
                        name: ele.name,
                        cord: ele.originLayout
                    });
                });
                return res;
            }
        },
        methods: {
            funDownload(content, filename) {
                // 创建隐藏的可下载链接
                var eleLink = document.createElement('a');
                eleLink.download = filename;
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                var blob = new Blob([content]);
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            },
            toggleButton: function(item) {
                if (this.activeSeat == item) {
                    return 'warning';
                }
                return item.cord ? 'success' : 'ghost';
            },
            resetButton:function(item){
                item.cord = '';
                if(this.activeSeat == item){
                    this.activeSeat = '';
                }
            },
            output: function() {
                var list = this.list;
                var res = [];
                list.forEach(function(ele, index, arr) {
                    if(ele.cord){
                        res.push({
                            name: ele.name,
                            cord: ele.originLayout
                        });
                    }
                    
                });
                // this.$Modal.success({
                //     title: '导出成功',
                //     content: '请按F12调出控制台，在console面板获取座位数据'
                // });
                this.funDownload(JSON.stringify(res), 'seat.json');
            },
            /**
               座位坐标大小选择框
            */
            selectSeat: function(item) {
                this.activeSeat = item;
                var _this = this;
                var map = _this.$el.querySelector('#map--shadow');
                var originMap = _this.$el.querySelector('#map--shadow');
                // debugger
                if (map.width) {
                    init();
                } else {
                    map.onload = init();
                }
                function init() {
                    // console.log(originMap.width + "," + originMap.height);
                    var selector = _this.$el.querySelector('#selector'),
                        map = _this.$el.querySelector('#map'),
                        container = _this.$el;
                        
                    //原图与操作界面比例
                    var RATIO = originMap.width / container.offsetWidth;
                    console.log(container.offsetWidth)
                    //避免mousemove下多次调用addEventListener
                    var on_once = 0;
                    document.addEventListener('mousedown', function mousedown1(md1) {
                        // 去除第一次单击事件
                        document.removeEventListener('mousedown', mousedown1);
                        if (md1.target !== map) {
                            return;
                        }
                        // selector重置大小
                        selector.style.display = 'block';
                        selector.style.width = '0px';
                        selector.style.height = '0px';
                        // selector定位
                        selector.style.top = md1.pageY - container.getBoundingClientRect().top  + 'px';
                        selector.style.left = md1.pageX - container.getBoundingClientRect().left + 'px';
                        // selector.style.top = md1.pageY - getOffset(container).top + container.offsetParent.scrollTop + "px";
                        // selector.style.left = md1.pageX - getOffset(container).left + container.scrollLeft + "px";
                        on_once = 1;
                        // 选择区域
                        document.addEventListener('mousemove', function mousemove(mv1) {
                            selector.style.width = parseInt(mv1.pageX - md1.pageX) + 'px';
                            selector.style.height = parseInt(mv1.pageY - md1.pageY) + 'px';
                            //第二次单击，选定
                            if (on_once === 1) {
                                on_once = 0;
                                document.addEventListener('mousedown', function mousedown2(md2) {
                                    // 去除第二次单击事件
                                    document.removeEventListener('mousedown', mousedown2);
                                    // 选定，去除mousemove事件
                                    document.removeEventListener('mousemove', mousemove);
                                    // 选择框在原图上的x，y坐标及长宽
                                    var resultX = (selector.offsetLeft * RATIO).toFixed(2),
                                        resultY = (selector.offsetTop * RATIO).toFixed(2),
                                        resultW = (selector.offsetWidth * RATIO).toFixed(2),
                                        resultH = (selector.offsetHeight * RATIO).toFixed(2);
                                    // console.log(resultX + " , " + resultY + " , " + resultW + " , " + resultH);
                                    item.originLayout = {
                                        x: resultX,
                                        y: resultY,
                                        w: resultW,
                                        h: resultH
                                    };
                                    item.cord = {
                                        x: selector.offsetLeft,
                                        y: selector.offsetTop,
                                        w: selector.offsetWidth,
                                        h: selector.offsetHeight
                                    };
                                    //选定后隐藏selector
                                    selector.style.display='none';
                                    console.log(item)
                                    //开始下一轮选择，再次监听新点击
                                    // document.addEventListener("mousedown",mousedown1);
                                });
                            }
                        });
                    });
                }
                function getOffset(element) {
                    var actualLeft = element.offsetLeft,
                        actualTop = element.offsetTop,
                        current = element.offsetParent; // 取得元素的offsetParent

                    // 一直循环直到根元素
                    while (current !== null) {
                        actualLeft += current.offsetLeft;
                        actualTop += current.offsetTop;
                        current = current.offsetParent;
                    }

                    // 返回包含left、top坐标的对象
                    return {
                        left: actualLeft,
                        top: actualTop
                    };
                }
            }
        }
    };
</script>
