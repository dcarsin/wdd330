stripe.onclick = function () {
    stripe.classList.add('animate');
};


color.onclick = function () {
    this.style.backgroundColor = 'red';
};

growing.onclick = function () {
    this.style.fontSize = '36px';
    this.style.color = 'red';
};

digit2.onclick = function () {
    stripe2.classList.add('animate');
}

boat2.onclick = function () {
    //...
    let times = 1;

    function go() {
        if (times % 2) {
            // sail to the right
            boat2.classList.remove('back');
            boat2.style.marginLeft = 100 * times + 200 + 'px';
        } else {
            // sail to the left
            boat2.classList.add('back');
            boat2.style.marginLeft = 100 * times - 200 + 'px';
        }

    }

    go();

    boat2.addEventListener('transitionend', function () {
        times++;
        go();
    });
};

boat2.onclick = () => boat2.classList.add('move');