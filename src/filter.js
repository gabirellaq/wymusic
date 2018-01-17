import Vue from 'vue'
Vue.filter('transformDate', (value)=>{
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
        return '';
    }
})
Vue.filter('filterImg', (value)=>{
    if(value.startsWith('http://p3')) return `${value.replace('p3','p1')}`;
    else if (value.startsWith('http://p4')) return `${value.replace('p4','p1')}`;
    else return value;
})