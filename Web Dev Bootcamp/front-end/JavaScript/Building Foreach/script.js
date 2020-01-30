let arr = [1, 2, 3];


Array.prototype.myForEach = function(func) {
    for(let i = 0; i < this.length; i++) {
        func(this[i]);
    }
}

arr.myForEach(function(element) {
    alert(element);
});
