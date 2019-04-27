import React from 'react';


function Footer() {

	return (
		<footer className="flex">
			<p>©2019 Shirley's Javascript Project. Data provided by <a href="https://www.petfinder.com/developers/v2/docs/" target="_blank">Pet Finder API</a></p>
			<div className="social-icons flex">
				<a href="#"><i className="fa fa-facebook-f"><span className="visuallyhidden">Facebook</span></i></a>
				<a href="#"><i className="fa fa-twitter"><span className="visuallyhidden">Twitter</span></i></a>
				<a href="#"><i className="fa fa-instagram"><span className="visuallyhidden">Instagram</span></i></a>
				<a href="#"><i className="fa fa-pinterest"><span className="visuallyhidden">Pinterest</span></i></a>
			</div>
		</footer>
	);
}

export default Footer;