;(function (win, doc) {

	function Pager(opts) {
		/**
		 * containerId 分页容器
		 * @type {String}
		 */
		this.containerId = opts.containerId;
		/**
		 * pageSize 分页大小
		 * @type {Number}
		 */
		this.pageSize = opts.pageSize;
		/**
		 * pageCount 分页总数
		 * @type {Number}
		 */
		this.pageCount = opts.pageCount;
		/**
		 * currentPage 当前页数
		 * @type {Number}
		 */
		this.currentPage = opts.currentPage;
		/**
		 * followPage 跟随展示页数
		 * @type {Number}
		 */
		this.followPage = opts.followPage;
		/**
		 * omit 分页省略符
		 * @type {String}
		 */
		this.omit = opts.omit || '...';
		/**
		 * currentStyle 当前页数样式
		 * @type {String}
		 */
		this.currentStyle = opts.currentStyle || 'current';

		/**
		 * boundaryPage 当前分页展示的临界值
		 * @type {Number}
		 */
		this.boundaryPage = 1 + this.followPage + 1 + this.followPage + 1;
		/**
		 * displayPages 存储需要展示的分页
		 * @type {Array}
		 */
		this.displayPages = [];//需要遍历循环的页数
	};


	/**
	 * init 分页组件初始化函数
	 */
	Pager.prototype.init = function () {		
		
		this.displayPage();
		
		if (this.containerId) {
			var container = document.getElementById(this.containerId);
			container.innerHTML = this.concatTpl();
		}
		this.bindDOM();
	};

	/**
	 * displayPage 过滤分页展示页数
	 */
	Pager.prototype.displayPage = function () {  console.dir(123);

		if (this.currentPage > this.pageCount) {
			this.currentPage = this.pageCount;
		} else if (this.currentPage < 1) {
			this.currentPage = 1;
		}

		var startFollowPage = (1 + this.boundaryPage) / 2;// 大于这个值开始分页

		if (this.pageCount <= this.boundaryPage) {// 小于阀值	

			for ( var i = 1; i <= this.pageCount; i ++ ) {
				this.displayPages.push(i);
			}

		} else if (this.pageCount > this.boundaryPage) {// 大于阀值		

			if (this.currentPage <= startFollowPage) {

				for ( var j = 1; j <= this.boundaryPage - 1; j ++ ) {
					this.displayPages.push(j);
				}
				this.displayPages.push(this.omit);
				this.displayPages.push(this.pageCount);

			} else {

				if ((this.currentPage + this.followPage) >= (this.pageCount - 1)) {
					
					this.displayPages.push(1);
					this.displayPages.push(this.omit);
					for ( var q = this.pageCount - (this.followPage * 2 + 1); q <= this.pageCount; q ++ ) {
						this.displayPages.push(q);
					}

				} else {

					this.displayPages.push(1);
					this.displayPages.push(this.omit);

					for ( var z = this.currentPage - this.followPage; z <= this.currentPage + this.followPage; z ++ ) {
						this.displayPages.push(z);
					}

					this.displayPages.push(this.omit);
					this.displayPages.push(this.pageCount);					

				}

			}

		}		
	};


	/**
	 * concatTpl 组装分页模板
	 * @return {String} 返回拼装后的分页DOM
	 */
	Pager.prototype.concatTpl = function () {
		var arr = [];

		if (this.currentPage === 1) {
			arr.push('<em style="color: grey;">上一页</em>');
		} else {
			arr.push('<a href="#; return false;">上一页</a>');
		}

		for ( var i = 0; i < this.displayPages.length; i ++ ) {

			if (typeof this.displayPages[i] === 'number') {

				if (this.displayPages[i] === this.currentPage) {
					arr.push('<span class="current">' + this.currentPage + '</span>');
				} else {
					arr.push('<a href="#; return false;">' + this.displayPages[i] + '</a>');
				}				

			} else if (typeof this.displayPages[i] === 'string') {

				arr.push('<em>' + this.displayPages[i] + '</em>');

			}

		}

		if (this.currentPage === this.pageCount) {
			arr.push('<em style="color: grey;">下一页</em>');
		} else {
			arr.push('<a href="#; return false;">下一页</a>');
		}
		
		this.displayPages = [];

		return arr.join('');
	};

	/**
	 * bindDOM 绑定DOM
	 */
	Pager.prototype.bindDOM = function () {
		var _this = this;
		var container = document.getElementById(this.containerId);
		Pager.addEvent(container, 'click', function (event) {
			var event = window.event || event;
			var selectedDOM =  event.srcElement || event.target;

			if(selectedDOM.tagName === 'A') {
				var num = selectedDOM.innerHTML;

				if (num === '上一页') { 
					_this.pre();
					return;
				} else if (num === '下一页') {
					_this.next();
					return;
				} else {
					_this.currentPage = parseInt(num);
				}

			} else {
				return;
			}

			_this.displayPage();
			container.innerHTML = _this.concatTpl();

		});
	};

	/**
	 * next 下一页
	 */
	Pager.prototype.next = function () {
		this.currentPage = this.currentPage + 1;
		this.displayPage();
		document.getElementById(this.containerId).innerHTML = this.concatTpl();
	};

	/**
	 * pre 上一页
	 */
	Pager.prototype.pre = function () {
		this.currentPage = this.currentPage - 1;
		this.displayPage();
		document.getElementById(this.containerId).innerHTML = this.concatTpl();
	}

	/**
	 * addEvent 工具函数，用来注册事件
	 * @param {HTML DOM} elem DOM元素
	 * @param {String} type 事件名称
	 * @param {Function} func 事件句柄
	 */
	Pager.addEvent = function (elem, type, func) {
		if (elem.addEventListener) {
			elem.addEventListener(type, func, false);
		} else if (elem.attachEvent) {
			elem.attachEvent('on' + type, func);
		}
	};

	win.Pager = Pager;

})(window, document);