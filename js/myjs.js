document.addEventListener("DOMContentLoaded", function(){
	/* open,close menu +*/
	const navTop = document.querySelector(".nav-top");
	const menuButton = document.querySelector(".btn");
	menuButton.addEventListener("click", function(){
		navTop.classList.toggle("nav-top-open");
	});
	/**/
	/* анімація заголовку та прелоадер */
	/* event for title, title content,arrow */
	const animatedTitle = document.querySelector(".animated-title");
	window.addEventListener("load", function(){
		requestAnimationFrame(getAnimatedTitle);
		setInterval(changeContentTitle,60000);
		requestAnimationFrame(animationArrow);
		requestAnimationFrame(animationBg);
	});

	/* event for nav,title,arrow */
	window.addEventListener("scroll", function(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		/*menu from static to fixed +*/
		requestAnimationFrame(function(){
			if(scrollTop > 50){
				navTop.classList.add("nav-top-fixed");
			} else{ navTop.classList.remove("nav-top-fixed");
				}
			});
		/* animation title +*/
		requestAnimationFrame(getAnimatedTitle);
		/**/
		requestAnimationFrame(animationArrow);
		/**/
		requestAnimationFrame(animationBg);
		/**/
		requestAnimationFrame(changeProgres);
	});

	/* resize window*/
	window.addEventListener("resize", function(){
		requestAnimationFrame(changeProgres);
	})
	/* open,close search +*/ 
	const searchItemTop = document.querySelector(".item-aside__search");
	const searchItemBottom = document.querySelector(".nav-bottom-link-search");
	const searchContainer = document.querySelector(".search-container");
	searchItemTop.addEventListener("click", changeStateSearch);
	searchItemBottom.addEventListener("click", changeStateSearch);
	const searchContainerButton = document.querySelector(".search-container-button");
	searchContainerButton.addEventListener("click",function(){
		searchContainer.classList.remove("search-container-open");
		searchItemTop.classList.remove("active-link");
		searchItemBottom.classList.remove("active-link");
	});

	/* open,close chat +*/
	const liveChatButton = document.querySelector(".live-chat-button");
	const itemAsideChat = document.querySelector(".item-aside__chat");
	const chatMainContainer = document.querySelector(".chat-main-container");
	itemAsideChat.addEventListener("click", function(){
		chatMainContainer.classList.add("chat-main-container-open");
		itemAsideChat.classList.remove("active-link");
	});
	liveChatButton.addEventListener("click", function(){
		chatMainContainer.classList.remove("chat-main-container-open");
		itemAsideChat.classList.add("active-link");
	});
	
	/* scroll */
	const linkNav = document.querySelectorAll('[href^="#"]'); //выбираем все ссылки к якорю на странице('[href^="#"]')
	    V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
	    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
	        e.preventDefault(); //отменяем стандартное поведение
	        document.querySelector(".nav-top").classList.remove("nav-top-open");
	       let w = window.pageYOffset,  // производим прокрутка прокрутка
	            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
	        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
	            start = null;
	        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
	        function step(time) {
	            if (start === null) start = time;
	            let progress = time - start,
	                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
	            window.scrollTo(0,r);
	            if (r != w + t) {
	                requestAnimationFrame(step)
	            } else {
	                location.hash = hash  // URL с хэшем
	            }
	        }
	    }, false);
	}
	
	/* open search */
	function changeStateSearch(){
		searchContainer.classList.add("search-container-open");
		searchItemTop.classList.add("active-link");
		searchItemBottom.classList.add("active-link");
	}

	/* animation title*/
	function getAnimatedTitle(){
		let windowHeight = document.documentElement.clientHeight;
		//console.log(windowHeight);
		let coorAnimatedTitle = animatedTitle.getBoundingClientRect();
		//console.log(coorAnimatedTitle.top);
		if( coorAnimatedTitle.top >= 0 && coorAnimatedTitle.top <= windowHeight){
			animatedTitle.classList.add("animated-title__show");
		} else{animatedTitle.classList.remove("animated-title__show");}
	}

	/* change content title */
	let index = 0;
	function changeContentTitle(){
		const listQuestion = ["Old software costing you time and money?",
							  "Old software costing you time and money? - 1",
							  "Old software costing you time and money? - 2",
							  "Old software costing you time and money? - 3"];
		if(index < listQuestion.length){
			animatedTitle.innerHTML = listQuestion[index];
			console.log(index);
			++index;
		} else{ 
			index = 0;
			changeContentTitle();
		}
		
	}

	/* animation arrow */
	const listArrow = document.querySelectorAll(".arrow");
	function animationArrow(){
		let windowHeight = document.documentElement.clientHeight;
		for(let i = 0; i < listArrow.length; i++ ){
			let coorArrow = listArrow[i].getBoundingClientRect();
			if(coorArrow.top >= 0 && coorArrow.top <= windowHeight){
				addClass(listArrow[i]);
			} else{ 
				removeClass(listArrow[i]);
			 }
		}
		
	}

	/* function change class for animationArrow()*/
	function addClass(elem){
		for(let s = 0; s < elem.children.length; s++){
			elem.children[s].classList.add("flash");
		}
	}
	function removeClass(elem){
		for(let s = 0; s < elem.children.length; s++){
			elem.children[s].classList.remove("flash");
		}
	}
	/**/
	const listElementWithBg = document.querySelectorAll(".animation-bg");
	function animationBg(){
		let windowHeight = document.documentElement.clientHeight;
		for(let i = 0; i < listElementWithBg.length; i++ ){
			let coorArrow = listElementWithBg[i].getBoundingClientRect();
			if((coorArrow.top >= 0 && coorArrow.top <= windowHeight) || (coorArrow.bottom >= 0 && coorArrow.bottom <= windowHeight)){
				listElementWithBg[i].classList.add("animation-bg-js");
			} else{ 
				listElementWithBg[i].classList.remove("animation-bg-js");
			 }
		}
	}
	/* scroll-bar, progres*/
	const progres = document.querySelector(".progres");
	function changeProgres(){
		let windowHeight = document.documentElement.clientHeight;
		let navTopWidth = document.querySelector(".nav-top").clientWidth;
		let bodyHeight = Math.max(
			  document.body.scrollHeight, document.documentElement.scrollHeight,
			  document.body.offsetHeight, document.documentElement.offsetHeight,
			  document.body.clientHeight, document.documentElement.clientHeight
			);
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		bodyHeigh = bodyHeight - windowHeight;
		let percentScroll = (scrollTop/(bodyHeigh/100));
		progres.style.width = (navTopWidth / 100) * percentScroll + "px";


	}
	
});
