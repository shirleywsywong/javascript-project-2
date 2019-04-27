import React from 'react';

function Header(props) {

	return (
		<header className="hero flex">
			<div className="title">
				<h1><span className="emphasize">{props.h1}</span></h1>
				<h2>{props.h2}</h2>
			</div>
		</header>
	);
}

export default Header;