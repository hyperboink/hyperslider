
### Basic Usage

```javascript
$("#sample1").hyperslider();
```
```html
<div id="sample1" class="hyperslider">
	<div class="slides">
		<div class="slide-box"><img src="images/1.jpg"></div>
		<div class="slide-box"><img src="images/5.jpg"></div>
		<div class="slide-box"><img src="images/3.jpg"></div>
		<div class="slide-box"><img src="images/2.jpg"></div>
		<div class="slide-box"><img src="images/4.jpg"></div>
	</div>
	<div class="slide-control">
		<button class="slide-prev">Prev</button>
		<button class="slide-next">Next</button>
	</div>
</div>
```

### Other Settings

```javascript
$('#sample1').hyperslider({
    animation: 'slide', // fade | slide | flash
    autoplay: true, // false for autoplay slide
    delay: 7000, // 7000 milliseconds delay
    before: function(el, settings){
        // code before
        // the slider loads
    },
    after: function(el, settings){
        // code after
        // the slider loads
    }
});
```

### via data-* attributes

```html
<div id="sample1" class="hyperslider" data-hyperslider>
	<div class="slides">
		<div class="slide-box"><img src="images/1.jpg"></div>
		<div class="slide-box"><img src="images/5.jpg"></div>
		<div class="slide-box"><img src="images/3.jpg"></div>
		<div class="slide-box"><img src="images/2.jpg"></div>
		<div class="slide-box"><img src="images/4.jpg"></div>
	</div>
	<div class="slide-control">
		<button class="slide-prev">Prev</button>
		<button class="slide-next">Next</button>
	</div>
</div>
```

For more information and details about this plugin just click this link.
<a target="_blank" href="https://hyperboink.github.io/hyperslider/">https://hyperboink.github.io/hyperslider/</a>


### Enjoy!