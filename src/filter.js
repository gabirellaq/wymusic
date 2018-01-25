import Vue from 'vue'
Vue.filter('transformTime', (value)=>{
    if(!value) return ''
    let date = new Date(value)
    let time
    if(date.getHours() ===0 ){
        time= date.getMinutes() + ":" + date.getSeconds()
    }else{
        time = date.getHours() +":"+ date.getMinutes() + ":" + date.getSeconds()
    }
    return time
})
Vue.filter('transformNumber', (value)=>{
    if(!value) return '0'
    const Billion = 100000000, Million = 10000;
    var num = +value;
    if (num >= Billion) {
        return ((num - num % Billion) / Billion) + '亿';
    } else if (num >= Million) {
        return ((num - num % Million) / Million) + '万';
    } else if (num >= 0) {
        return num;
    } else {
        return '0';
    }
})
Vue.filter('filterImg', (value)=>{
    if(value.startsWith('http://p3')) return `${value.replace('p3','p1')}`;
    else if (value.startsWith('http://p4')) return `${value.replace('p4','p1')}`;
    else return value;
})
Vue.filter('fiterVideo', (value)=>{
    if(value.startsWith('http://v3.')) return `${value.replace('v3','v6c')}`;
    else if (value.startsWith('http://v4.')) return `${value.replace('v4','v6c')}`;
    else return value;
})
Vue.filter('fiterAvator', (value)=>{
    if(value !== null){
        value = value;
    }else{
        value = 'http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg'
    }
    return value;
})