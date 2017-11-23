function fadeIn(ele) {
  var current,//当前值
    speed,//移动速度
    time = 300,//位移总时间
    interval = 10;//位移间隔时间
  
  speed = 100 / (time / interval);
  if(getStyle(ele,'opacity') === 1) {
    return;
  }
  ele.style.display = 'block';
  //定时器
  clearInterval(ele.timer);
  ele.timer = setInterval(handler, interval);
  
  //执行函数
  function handler() {
    current = (getStyle(ele, 'opacity') || 1) * 100;//opacity当前值
    
    current += speed;
    
    ele.style.opacity = current / 100;
    ele.style.filter = 'alpha(opacity =' + current + ')';
  
  
    if ((100 - current) < speed) {
      ele.style.opacity = 1;
      ele.style.filter = 'alpha(opacity =' + 100 + ')';
      clearTimeout(ele.timer);
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
