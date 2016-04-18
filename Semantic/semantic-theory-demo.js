// Firefox和Chrome早期版本中带有前缀
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

// 选择目标节点
var target = document.querySelector('#some-id');

// 创建观察者对象
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });
});

// 配置观察选项:
var config = {attributes: true, childList: true, characterData: true};

// 传入目标节点和观察选项
observer.observe(target, config);

// 随后,你还可以停止观察
observer.disconnect();
