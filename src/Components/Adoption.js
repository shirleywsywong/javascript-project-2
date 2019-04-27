import React, {Component} from 'react';
import axios from 'axios';
import loading from "../styles/assets/loading.gif";

const APIKEY = process.env.REACT_APP_API_KEY;

class Adoption extends Component {

	constructor(props) {
		super(props); 
		this.state= {
      		allCatData: [],
      		filteredCatData: [],
      		userInput: {
      			size: 'anySize',
      			gender: 'anyGender',
      			age: 'anyAge'
      		}
    	}
	};

	componentDidMount() {
		this.getPFData()
	}

	//watch change on userInput. If there's a change, run catDataFilter again
	componentDidUpdate(prevProps, prevState) {

		const {userInput} = this.state;

		if (userInput !== prevState.userInput) {
			this.catDataFilter();
		}	
	}

	//get data from Pet Finder API
	async getPFData() {
		try {
			const PFData = await 
				axios({
					method: 'GET',
					url: 'https://shirley-js-p2.herokuapp.com/petfinder',
					params: {
				    	reqUrl: 'https://api.petfinder.com/v2/animals',
				    	params: {
				     		type: 'cat',
				     		organization: 'ON205',
				     		status: 'adoptable'
				    	},
						clientId: APIKEY
					}
				})
				const {data} = PFData;
				const {animals: allCatData} = data;
				this.setState({
					allCatData: allCatData,
					filteredCatData: allCatData
				});
		}
		catch (error) {
			console.log(error.message);
			alert(`cat.exe stopped running. Please reboot the cat!`)
		};
	} 

	//get user input from form
	getUserInput(event, inputField) {
		const {userInput} = this.state;
		const {size, gender, age} = userInput

		//since only 1 value can change at a time, this is to set the previous value of the other 2 fields
		const newClick = {
      		sizeField: size,
      		genderField: gender,
      		ageField: age
      		}

      	//getting the value changed based on the form
		newClick[inputField] = event.target.value;
		this.setState({
			userInput: {
				size: newClick.sizeField,
				gender: newClick.genderField,
				age: newClick.ageField,
			}
		});
	}
	
	//display the form on the DOM
	renderForm() {
		return(
			<div>
				<h2 className="emphasize">{this.props.h2}</h2>
				<p>{this.props.content}</p>
				<form className = "flex">
					<label htmlFor="animal">Find your cat:</label>
					<select 
					name="Size" 
					id="Size" 
					onChange={ (event) => {this.getUserInput(event, "sizeField")}}>
						<option value="" disabled selected>Size</option>
						<option value="anySize">Any</option>
						<option value="Small">Small</option>
						<option value="Medium">Medium</option>
						<option value="Large">Large</option>
					</select>
					<select 
					name="Gender" 
					id="Gender"
					onChange={ (event) => {this.getUserInput(event, "genderField")}}>
						<option value="" disabled selected>Gender</option>
						<option value="anyGender">Any</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<select 
					name="Age" 
					id="Age"
					onChange={ (event) => {this.getUserInput(event, "ageField")}}>
						<option value="" disabled selected>Age</option>
						<option value="anyAge">Any</option>
						<option value="Young">Young</option>
						<option value="Adult">Adult</option>
						<option value="Senior">Senior</option>
					</select>
				</form>
			</div>
		)
	}

	//filter data based on userInput
	catDataFilter() {
		const {allCatData, userInput} = this.state;

		//temporarily hold each cat that match the criteria
		let tempCatData = []

		//go through each cat from raw data and run through the filter
		allCatData.map(item => {
			const {size, gender, age} = item;
			let genderFilter, ageFilter, sizeFilter = false;

			if ((gender === userInput.gender) || (userInput.gender === 'anyGender')) {
				genderFilter = true;
			}
			if ((age === userInput.age) || (userInput.age === 'anyAge')) {
				ageFilter = true;
			}
			if ((size === userInput.size) || (userInput.size === 'anySize')) {
				sizeFilter = true;
			} 
			//if all 3 filters are run, then add the cat to tempCatData
			if (genderFilter && ageFilter && sizeFilter) {
				tempCatData.push(item)
			}
		})
		this.setState ({
			filteredCatData: tempCatData
		});
	};

	//display the results on the DOM
	renderList() {
		const {filteredCatData} = this.state;

		//if no matching results, let the user know
		if (filteredCatData.length == 0) {
			return (
				<div className="masonry-item">
					<p>Your search did not return any results, but don't give up! There're so many more cats you can snuggle with.</p>
					<img src={loading} alt=""/>
				</div>
			);
		}

		const listHtml = filteredCatData.map(catProfile => {
			const {id, name, description, photos, url} = catProfile;
			const profilePhoto = photos[0].medium;
			
			//decode the description into HTML
			var descTxt = document.createElement("textarea");
			descTxt.innerHTML = description;
			var descTxt2 = document.createElement("textarea");
			descTxt2.innerHTML = descTxt.value;

			//if description returns 'undefined', give a general purpose description
			let profileDesc = descTxt2.value.split(':')[2]
			if (typeof profileDesc == 'undefined') {
				profileDesc = `${name} will sit on your keyboard and prevent you from working all day, in case if you need an excuse.`
			}

			return (
				<div className="masonry-item" key={id}>
					<div className="gallery-item-img relative">
						<img src={profilePhoto} alt={name}/>
						<div className="gallery-overlay flex">
							<p>{profileDesc}</p>
							<p><a href={url} target="_blank">Adopt me today!</a></p>
						</div>
					</div>
					<div className="gallery-name">
						<p className="cat-name">My name is {name}.</p>
					</div>
				</div>
			);
		})
		return listHtml;
	}

	//loading screen while api call is happening
	renderEmptyState() {
		return (
			<div className="masonry-item">
				<p>Cat.exe is loading...</p>
				<img src={loading} alt="Fetching data"/>
			</div>
		);
	}

	render() {
	    return (
		    <section className="adoption">
		    {this.renderForm()}
		    <div className="masonry">
		    	
		    	{this.state.allCatData.length 
		    		? this.renderList() 
		    		: this.renderEmptyState()}
		    </div>
		    </section>
	    );
	}

}


export default Adoption;