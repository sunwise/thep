// page init
jQuery(function(){
	initFadeDrop();
	initSlideBlock();
	initInputs();
	initDropDown();
	initDropDown2();
        showSelectedNav();
})

$(document).ready(function() {
	$( 'a[href^="http://"]' ).attr( 'target','_blank' );
	$( 'a[href^="https://"]' ).attr( 'target','_blank' );
});

function showSelectedNav(){
    var items = $('ul.fade-menu li');
    var animSpeed = 500;
    items.each (function () {
        var item = $(this);
        var drop = item.find('>ul');
	var drop2 = item.find('.drop');
        var arrow = item.find('.arrow').css({opacity:0});
        if(item.hasClass('selected')){
               drop.stop().animate(
                        {opacity:1},
                        {duration:animSpeed, complete: function() {drop.css({opacity:""})}}
                ).css({'display':'block'});
                drop2.stop().animate(
                        {opacity:1},
                        {duration:animSpeed, complete: function() {drop2.css({opacity:""})}}
                ).css({'display':'block'});
                arrow.stop().animate({opacity:1}, animSpeed);
        }
    }); 
}

function hideSelectedNav(){
    var items = $('ul.fade-menu li');
    var animSpeed = 500;
    items.each (function () {
        var item = $(this);
        var drop = item.find('>ul');
	var drop2 = item.find('.drop');
        var arrow = item.find('.arrow').css({opacity:0});
        if(item.hasClass('selected')){
               drop.stop().animate(
                        {opacity:0},
                        {duration:animSpeed, complete: function() {drop.css({opacity:0})}}
                ).css({'display':'none'});
                drop2.stop().animate(
                        {opacity:0},
                        {duration:animSpeed, complete: function() {drop2.css({opacity:0})}}
                ).css({'display':'none'});
                arrow.stop().animate({opacity:0}, animSpeed);
        }
    }); 
}

// fade dropdown init
function initFadeDrop(){
	var items = $('ul.fade-menu li');
	var animSpeed = 500;
	items.each (function () {
		var item = $(this);
		var arrow = item.find('.arrow').css({opacity:0});
		var drop = item.find('>ul').css({opacity:0, 'display':'none'});
		var drop2 = item.find('.drop').css({opacity:0, 'display':'none'});
		item.mouseenter( function() {
			if(item.hasClass('has-drop-down')){
				arrow.stop().animate({opacity:1}, animSpeed);
			}
			drop.stop().animate(
				{opacity:1},
				{duration:animSpeed, complete: function() {drop.css({opacity:""})}}
			).css({'display':'block'});
			drop2.stop().animate(
				{opacity:1},
				{duration:animSpeed, complete: function() {drop2.css({opacity:""})}}
			).css({'display':'block'});
                        if(!item.hasClass('selected')){
                            hideSelectedNav();
                        }
		}).mouseleave(function(){
			drop.stop().animate({opacity:0},{duration:animSpeed, complete:function() {
				drop.css({display:'none'});
			}});
			drop2.stop().animate({opacity:0},{duration:animSpeed, complete:function() {
				drop2.css({display:'none'});
			}});
			arrow.stop().animate({opacity:0}, animSpeed);
                        showSelectedNav();
		}); 
	});
}

// slide block init
function initSlideBlock() {
	var animSpeed = 500;
	$('ul.slide-links > li').each(function(){
		var item = $(this);
		var mask = item.find('.mask');
		var drop = item.find('.title');
		mask.css({top:item.height() - drop.outerHeight(true)});
		drop.css({marginTop:0});
		item.hover(function() {
			mask.stop().animate({marginTop:-10}, animSpeed);
		}, function() {
			mask.stop().animate({marginTop:0}, animSpeed);
		});
	});
}

// drop down menu init
function initDropDown() {
	var nav = document.getElementById("nav");
	if(nav) {
		var lis = nav.getElementsByTagName("li");
		for (var i=0; i<lis.length; i++) {
			if(lis[i].getElementsByTagName("ul").length > 0) {
				lis[i].className += " has-drop-down"
				lis[i].getElementsByTagName("a")[0].className += " has-drop-down-a"
			}
		}
	}
}

function initDropDown2(){
	var nav = document.getElementById("nav2");
	if(nav) {
		var lis = nav.getElementsByTagName("li");
		for (var i=0; i<lis.length; i++) {
			if(lis[i].getElementsByTagName("ul").length > 0) {
				lis[i].className += " has-drop-down"
				lis[i].getElementsByTagName("a")[0].className += " has-drop-down-a"
			}
		}
	}
}

// clear inputs on focus
function initInputs() {
	// replace options
	var opt = {
		clearInputs: true,
		clearTextareas: true,
		clearPasswords: true
	}
	// collect all items
	var inputs = [].concat(
		PlaceholderInput.convertToArray(document.getElementsByTagName('input')),
		PlaceholderInput.convertToArray(document.getElementsByTagName('textarea'))
	);
	// apply placeholder class on inputs
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].className.indexOf('default') < 0) {
			var inputType = PlaceholderInput.getInputType(inputs[i]);
			if((opt.clearInputs && inputType === 'text') ||
				(opt.clearTextareas && inputType === 'textarea') || 
				(opt.clearPasswords && inputType === 'password')
			) {
				new PlaceholderInput({
					element:inputs[i],
					wrapWithElement:false,
					showUntilTyping:false,
					getParentByClass:false,
					placeholderAttr:'value'
				});
			}
		}
	}
}

// input type placeholder class
;(function(){
	PlaceholderInput = function() {
		this.options = {
			element:null,
			showUntilTyping:false,
			wrapWithElement:false,
			getParentByClass:false,
			placeholderAttr:'value',
			inputFocusClass:'focus',
			inputActiveClass:'text-active',
			parentFocusClass:'parent-focus',
			parentActiveClass:'parent-active',
			labelFocusClass:'label-focus',
			labelActiveClass:'label-active',
			fakeElementClass:'input-placeholder-text'
		}
		this.init.apply(this,arguments);
	}
	PlaceholderInput.convertToArray = function(collection) {
		var arr = [];
		for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
		 arr[i] = collection[i];
		}
		return arr;
	}
	PlaceholderInput.getInputType = function(input) {
		return (input.type ? input.type : input.tagName).toLowerCase();
	}
	PlaceholderInput.prototype = {
		init: function(opt) {
			this.setOptions(opt);
			if(this.element && this.element.PlaceholderInst) {
				this.element.PlaceholderInst.refreshClasses();
			} else {
				this.element.PlaceholderInst = this;
				if(this.elementType == 'text' || this.elementType == 'password' || this.elementType == 'textarea') {
					this.initElements();
					this.attachEvents();
					this.refreshClasses();
				}
			}
		},
		setOptions: function(opt) {
			for(var p in opt) {
				if(opt.hasOwnProperty(p)) {
					this.options[p] = opt[p];
				}
			}
			if(this.options.element) {
				this.element = this.options.element;
				this.elementType = PlaceholderInput.getInputType(this.element);
				this.wrapWithElement = (this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement);
				this.setOrigValue( this.options.placeholderAttr == 'value' ? this.element.defaultValue : this.element.getAttribute(this.options.placeholderAttr) );
			}
		},
		setOrigValue: function(value) {
			this.origValue = value;
		},
		initElements: function() {
			// create fake element if needed
			if(this.wrapWithElement) {
				this.element.value = '';
				this.element.removeAttribute(this.options.placeholderAttr);
				this.fakeElement = document.createElement('span');
				this.fakeElement.className = this.options.fakeElementClass;
				this.fakeElement.innerHTML += this.origValue;
				this.fakeElement.style.color = getStyle(this.element, 'color');
				this.fakeElement.style.position = 'absolute';
				this.element.parentNode.insertBefore(this.fakeElement, this.element);
			}
			// get input label
			if(this.element.id) {
				this.labels = document.getElementsByTagName('label');
				for(var i = 0; i < this.labels.length; i++) {
					if(this.labels[i].htmlFor === this.element.id) {
						this.labelFor = this.labels[i];
						break;
					}
				}
			}
			// get parent node (or parentNode by className)
			this.elementParent = this.element.parentNode;
			if(typeof this.options.getParentByClass === 'string') {
				var el = this.element;
				while(el.parentNode) {
					if(hasClass(el.parentNode, this.options.getParentByClass)) {
						this.elementParent = el.parentNode;
						break;
					} else {
						el = el.parentNode;
					}
				}
			}
		},
		attachEvents: function() {
			this.element.onfocus = bindScope(this.focusHandler, this);
			this.element.onblur = bindScope(this.blurHandler, this);
			if(this.options.showUntilTyping) {
				this.element.onkeydown = bindScope(this.typingHandler, this);
				this.element.onpaste = bindScope(this.typingHandler, this);
			}
			if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
		},
		togglePlaceholderText: function(state) {
			if(this.wrapWithElement) {
				this.fakeElement.style.display = state ? '' : 'none';
			} else {
				this.element.value = state ? this.origValue : '';
			}
		},
		focusSetter: function() {
			this.element.focus();
		},
		focusHandler: function() {
			this.focused = true;
			if(!this.element.value.length || this.element.value === this.origValue) {
				if(!this.options.showUntilTyping) {
					this.togglePlaceholderText(false);
				}
			}
			this.refreshClasses();
		},
		blurHandler: function() {
			this.focused = false;
			if(!this.element.value.length || this.element.value === this.origValue) {
				this.togglePlaceholderText(true);
			}
			this.refreshClasses();
		},
		typingHandler: function() {
			setTimeout(bindScope(function(){
				if(this.element.value.length) {
					this.togglePlaceholderText(false);
					this.refreshClasses();
				}
			},this), 10);
		},
		refreshClasses: function() {
			this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
			this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
			this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
			this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
			this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
			this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
			this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
		},
		setStateClass: function(el,cls,state) {
			if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
		}
	}
	
	// utility functions
	function hasClass(el,cls) {
		return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	}
	function addClass(el,cls) {
		if (!hasClass(el,cls)) el.className += " "+cls;
	}
	function removeClass(el,cls) {
		if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
	function bindScope(f, scope) {
		return function() {return f.apply(scope, arguments)}
	}
	function getStyle(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	}
}());