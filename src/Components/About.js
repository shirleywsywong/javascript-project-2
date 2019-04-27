import React from 'react';

function About(props) {

	return (
		<section className="about">
			<h2 className="emphasize">{props.h2}</h2>
			<p>{props.p1}</p>
			<p>{props.p2}</p>
		</section>
	);
}

export default About;