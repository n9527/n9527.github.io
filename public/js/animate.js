function animate(ele, json, callback) {
  var current,//当前值
    target,//目标值
    speed = {},//移动速度
    original = {},//目标元素的原始值
    time = 200,//位移总时间
    interval = 20;//位移间隔时间
  
  //获取元素的原始值,计算速度;
  for (var key in json) {
    if (key === 'opacity') {
      original[key] = (getStyle(ele, key) || 1) * 100;//opacity的数据需要格式化一下
      speed[key] = (json[key] * 100 - original[key]) / (time / interval); //速度同样需要格式化
    } else {
      original[key] = parseInt(getStyle(ele, key)) || 0;
      speed[key] = (json[key] - original[key]) / (time / interval);
    }
  }
  
  //定时器
  clearInterval(ele.timer)
  ele.timer = setInterval(handler, interval);
  
  //执行函数
  function handler() {
    //每次执行都要赋值为true,遍历时候如果有任何一个没设置完成就要修改为false;
    var flag = true;
    
    //遍历设置所有属性
    for (var k in json) {
      
      //每次执行都要获取目标对象的: 当前值 & 目标值;
      if (k === 'opacity') {
        current = (getStyle(ele, k) || 1) * 100;//opacity当前值
        target = json[k] * 100;//opacity目标值
      } else {
        current = parseInt(getStyle(ele, k)) || 0;//其他属性
        target = json[k];//其他属性
      }
      
      //所有属性全部完成?
      if (current !== target) {
        flag = false;
      }
    
      //属性全部设置完成才能清楚定时器
      if (flag) {
        clearInterval(ele.timer);
        if (callback) {
          callback(ele);
        }
        return;
      }
      
      //alert('没返回')
      
      //没完成?
      if (Math.abs(target - current) > Math.abs(speed[k])) {
        current += speed[k];
        
        //opacity
        if (k === 'opacity') {
          ele.style[k] = current / 100;
          ele.style.filter = 'alpha(opacity=' + current + ')';
          
          //层级
        } else if (k === 'zIndex') {
          ele.style.zIndex = target;
          
          //其他属性
        } else {
          ele.style[k] = current + 'px';
        }
        //完成了?
      } else {
        if (k === 'opacity') {
          //opacity标准浏览器直接赋值传入的参数
          ele.style[k] = json[k];
          //opacity低版本ie需要格式化
          ele.style.filter = 'alpha(opacity =' + target + ')';
        } else if (k === 'zIndex') {
          ele.style.zIndex = target;
        }
        else {
          ele.style[k] = target + 'px';//其他属性
        }
      }
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
