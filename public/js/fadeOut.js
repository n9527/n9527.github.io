function fadeOut(ele) {
  var current,//当前值
    speed,//移动速度
    time = 300,//位移总时间
    interval = 20;//位移间隔时间
  
  speed = 100 / (time / interval) * -1;
  
  //定时器
  if(getStyle(ele,'display') === 'none' && getStyle(ele,'opacity') === 0) {
    return;
  }
  clearInterval(ele.timer);
  ele.timer = setInterval(handler, interval);
  
  //执行函数
  function handler() {
    current = (getStyle(ele, 'opacity') || 1) * 100;//opacity当前值
    
    current += speed;
    
    ele.style.opacity = current/100;
    ele.style.filter = 'alpha(opacity = ' + current + ')';
  
  
    if(current < 0){
      ele.style.opacity = 0;
      ele.style.filter = 'alpha(opacity = ' + 0 + ')';
      ele.style.display = 'none';
      clearTimeout(ele.timer)
    }
  }
  
}



//兼容获取元素css值
function getStyle(ele, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[attr];
  } else {
    return ele.currentStyle[attr];
  }
}
