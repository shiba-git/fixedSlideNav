 /**
 * fixedSlideNav v1.2
 * Copyright 2019 Shibayama Hiroki
 * Thank you for using
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function( $ ) {
  	$.fn.fixedSlideNav = function(options) {

		var defaultSettings = $.extend({
			btColor: "#ccc",
			btColorHover: "#000",
			btIcon: "circle",
			scrollAnimationSpeed: "500",
			pcScall: "17px",
			spScall: "25px",
			pcMargin: "100% 0",
			spMargin: "40% 0",
			developMood: false,
			bgColor1: '#f0f8ff',
			bgColor2: '#f5f5dc',
			bgColor3: '#f0ffff',
			bgColor4: '#ffffe0',
			bgColor5: '#e0ffff',
			bgColor6: '#fffff0',
			bgColor7: '#f5f5f5',
			developBorder: true,
			parsonWarn: true
		}, options);

		let sections = this;
		let sectionLength = sections.length;
		const body = document.body;
		const indicator = createIndicator(sectionLength);

		// 機能制限フィルター
		function sectionFilter(sectionLength, sections){
			//const overCon = Math.abs(7 - sectionLength);
			if(sectionLength > 7){ 
				console.error("The maximum number of sections is 7"); 
				for(var i = 7; i < sectionLength; i ++){
					sections[i].parentNode.removeChild(sections[i]);
				}
			}
		}

		function characterizationFilter(){
			var metaDiscre = document.head.children;
			var metaLength = metaDiscre.length;
			var charsetSearch = [];
			for(var i = 0;i < metaLength;i++){
				var proper = metaDiscre[i].getAttribute('charset');
				charsetSearch.push(proper);
			}
			var charset = charsetSearch.some(function(v){
				return (v !== null);
			});
			if(charset){
				return false;
			}else{
				console.error("Specify a character code, which must be a character code.");
			}
		}

		function parsonEleWarn(sectionLength, sections){
			var array = []
			for(var i =  0; i < sectionLength; i++){
				array.push(sections[i].parentNode);
			}
			var min = 0;
			var max = array.length - 1;

			for(i < 0; i < 100; i++){
				var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
				var b = Math.floor( Math.random() * (max + 1 - min) ) + min ;
				if(array[a] !== array[b]){
					console.warn("The layout may be destroyed.");
					return false;
				}
			}
		}

		function createIndicator(count){
			const ul = document.createElement("ul");
			ul.setAttribute("id", "ulfixedSlideNav");
			ul.style.listStyleType = "none";
			ul.style.position = "fixed";
			ul.style.right = "3%";

			if(defaultSettings.btIcon == "square"){
				defaultSettings.btIcon = "■";
			}else if(defaultSettings.btIcon == "circle"){
				defaultSettings.btIcon = "●";
			}

			if(count > 7){  count = 7; }
			for(var i = 0; i < count; i++){
				const li = document.createElement("li");
				const a = document.createElement("a");

				a.href = "#d" + (i + 1);
				a.textContent = defaultSettings.btIcon;
				a.style.textDecoration = "none";
				a.style.color = defaultSettings.btColor;
				li.style.textAlign = "right";

				li.appendChild(a);
				ul.appendChild(li);
			}

			return ul;
		}

		function putIdToSection(sections){
			for(var j = 0; j < sectionLength; j++){
				sections[j].setAttribute("id", "d"+ (j + 1));
				sections[j].style.height = "100vh";
				sections[j].style.margin = "0px";
			}
			return sections;
		}

		function developMood(sections, sectionLength){
			var color = [defaultSettings.bgColor1, defaultSettings.bgColor2, defaultSettings.bgColor3, defaultSettings.bgColor4,
			defaultSettings.bgColor5,defaultSettings.bgColor6,defaultSettings.bgColor7];
			for(var i = 0; i < sectionLength; i++){
				sections[i].style.backgroundColor = color[i];
				defaultSettings.developBorder ? sections[i].style.borderBottom = "1px solid #696969" : false;
				if(i == sectionLength - 1){
					sections[i].style.borderBottom = "0px solid #dcdcdc";
				}
			}
		}

		function init(){
			sectionFilter(sectionLength, sections);
			defaultSettings.parsonWarn ? parsonEleWarn(sectionLength,sections) : false;
			characterizationFilter();
			putIdToSection(sections);
			body.appendChild(indicator);
			defaultSettings.developMood ? developMood(sections, sectionLength) : false;
		}

		init();

		var running = false;
		var optimizedCallback = function(){
			let scrollValue = [];
			var posScroll = $(window).scrollTop();
			var li = $('ul#ulfixedSlideNav > li');
			var newEvent = new $.Event("scrollstop"),
			timer;

			if(window.matchMedia('(max-width: 750px)').matches) {
				for(i = 0; i < li.length; i++){
			 		li[i].style.margin = defaultSettings.spMargin;
					li[i].style.fontSize = defaultSettings.spScall;
			 	}        
		    }
		    if(window.matchMedia('(min-width: 751px)').matches) {
		    	for(i = 0; i < li.length; i++){
			 		li[i].style.margin = defaultSettings.pcMargin;
					li[i].style.fontSize = defaultSettings.pcScall;
			 	}
		    }
			function ulPosition(indicator){
				let ulHeight = indicator.getBoundingClientRect().height + 'px';
				indicator.style.top = "calc(50% - %ulHeight / 2)".replace("%ulHeight", ulHeight);
			}

			function btPositionValue(){
				var aElem = $('ul#ulfixedSlideNav > li > a');
				for(var i = 0; i < aElem.length; i++){
					var hash = aElem[i].hash;
					var p = Math.round($(hash).offset().top);
					scrollValue.push(p);
				}
				scrollValue[0] = 0;
				return scrollValue;
			};

			function btPositionColorHover(){
				var aElem = $('ul#ulfixedSlideNav > li > a');
				var aLen = aElem.length;
				var last = scrollValue.slice(-1)[0];

				for(var k = 0; k < aLen; k ++){
					aElem[k].style.color = defaultSettings.btColor;
				}
				if(posScroll == 0 || posScroll > scrollValue[0] && posScroll < scrollValue[1]){
					aElem[0].style.color = defaultSettings.btColorHover;
				}else if(posScroll == scrollValue[1] || posScroll > scrollValue[1] && posScroll < scrollValue[2]){
					aElem[1].style.color = defaultSettings.btColorHover;

				}else if(posScroll == scrollValue[2] || posScroll > scrollValue[2] && posScroll < scrollValue[3]){
					aElem[2].style.color = defaultSettings.btColorHover;
				}
				else if(posScroll == scrollValue[3] || posScroll > scrollValue[3] && posScroll < scrollValue[4]){
					aElem[3].style.color = defaultSettings.btColorHover;
				}
				else if(posScroll == scrollValue[4] || posScroll > scrollValue[4] && posScroll < scrollValue[5]){
					aElem[4].style.color = defaultSettings.btColorHover;
				}
				else if(posScroll == scrollValue[5] || posScroll > scrollValue[5] && posScroll < scrollValue[6]){
					aElem[5].style.color = defaultSettings.btColorHover;
				}
				else if(posScroll > last || posScroll == last){
					aElem[aLen-1].style.color = defaultSettings.btColorHover;
				}
			}

			ulPosition(indicator);
			btPositionValue();
			btPositionColorHover();

			$('ul#ulfixedSlideNav > li > a').hover(
				function(){
					$(this).css("color", defaultSettings.btColorHover);
				},
				function(){
					$(this).css("color", defaultSettings.btColor);
					btPositionColorHover();
				}
			);
		};

		$(function(){
			$('ul#ulfixedSlideNav > li > a').on('click', function(e){
				e.preventDefault();
				var href = $(this).attr("href");
				var pos = $(href).offset().top;
				$('html,body').animate({'scrollTop': pos}, parseInt(defaultSettings.scrollAnimationSpeed, 10), 'swing');
			});

			
		});
		window.addEventListener('scroll', function(){
			console.log("scroll");
			if(!running){
				running = true;
				window.requestAnimationFrame(function(){
					running = false;
					optimizedCallback();
				});
			}
		});

		window.addEventListener('load', function(){
			console.log("load");
			if(!running){
				running = true;
				window.requestAnimationFrame(function(){
					running = false;
					optimizedCallback();
				});
			}
		});

		window.addEventListener('resize', function(){
			console.log("resize");
			if(!running){
				running = true;
				window.requestAnimationFrame(function(){
					running = false;
					optimizedCallback();
				});
			}
		});

	};

})( jQuery );