;(function () {

var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '), prop, ele = document.createElement('div');

for ( var z = 0, zlen = props.length; z < zlen; z ++ ) {
	if ( typeof ele.style[ props[z] ] !== 'undefined' ) {
		prop = props[z];
		break;
	}
}

var xAngle = 0, yAngle = 0;
document.getElementsByTagName('body')[0].onkeydown = function (evt) {

	switch ( evt.keyCode ) {
		case 38://up
			xAngle += 90;
			evt.preventDefault();
			break;

		case 37://left
			yAngle -= 90;
			break;

		case 39://right
			yAngle += 90;
			break;

		case 40://down
			xAngle -= 90;
			evt.preventDefault();
			break;		
	}
	
	document.getElementById('cube').style[ prop ] = 'rotateX(' + xAngle + 'deg)' + ' rotateY(' + yAngle + 'deg)';
}

})();