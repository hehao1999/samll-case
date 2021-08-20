window.addEventListener('load', function () {
    // 隐藏显示左右按钮
    const btn_left = document.querySelector('.btn-left');
    const btn_right = document.querySelector('.btn-right');
    const focus = document.querySelector('.focus')

    focus.addEventListener('mouseenter', function () {
        btn_left.style.display = 'inline-block';
        btn_right.style.display = 'inline-block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        btn_left.style.display = 'none';
        btn_right.style.display = 'none';
        timer = setInterval(function () {
            btn_right.click();
        }, 2000)
    })

    // 动态生成圆点,并设置点击圆点移动元素
    const ul = focus.querySelector('ul');
    const ol = focus.querySelector('.circle')
    for (let i = 0; i < ul.childElementCount; i++) {
        //动态生成小圆圈
        const li = document.createElement('li');
        li.setAttribute('index', i)
        if (i == 0) {
            li.className = 'current';
        }
        ol.appendChild(li);
        //小圆圈点击事件
        li.addEventListener('click', function () {
            for (let i = 0; i < ol.childElementCount; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //让小圆圈和箭头同步
            num = this.getAttribute('index');
            animate(ul, -this.getAttribute('index') * focus.offsetWidth);
        })
    }
    //克隆第一张到最后,以便之后实现无缝切换
    const first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //右箭头
    //全局变量
    var num = 0;
    var circle = 0;
    var flag = true; //节流阀
    btn_right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //翻到最后快速到克隆图片,再次点击直接到第二张图片
            if (num == ul.childElementCount - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focus.offsetWidth, function () {
                // alert(flag);
                flag = true;
            });
            circleChange();
        }
    })

    //左箭头
    var num = 0;
    var circle = 0;
    btn_left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //翻到最后快速到克隆图片,再次点击直接到第二张图片
            if (num == 0) {
                num = ul.childElementCount - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            animate(ul, -num * focus.offsetWidth, function () {
                // alert(flag);
                flag = true;
            });
            circleChange();
        }
    })

    // 自动播放
    var timer = setInterval(function () {
        btn_right.click();
    }, 2000)

    function circleChange() {
        // 小圆圈同步
        circle = num;
        if (circle == ol.childElementCount) {
            circle = 0;
        }
        for (let i = 0; i < ol.childElementCount; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 移动元素函数
    function animate(obj, target, callback) {
        // 清除之前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            const step = ((target - obj.offsetLeft) / 10) < 0 ? Math.floor((target - obj.offsetLeft) / 10) : Math.ceil((target - obj.offsetLeft) / 10);
            // console.log(obj.offsetLeft, target, step)
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            //移动元素
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 20)
    }
})



