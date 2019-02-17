import React, {Component} from 'react';
import './Country.css';

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            randomCountry: {},
            randomOptions: [],
            userIsWin: undefined,
            disableFieldset: false,
            goodGuess: 0,
            bgColor: {backgroundColor: '#FFFFFF'}
        }
        this.getRandomCountry = this.getRandomCountry.bind(this);
        this.checkWin = this.checkWin.bind(this);
    }

    componentDidMount() {
        const apiUrl = "https://restcountries.eu/rest/v2/all";
        fetch(apiUrl)
        .then(data => data.json())
        .then(countries => this.setState({countries}))
        .then(this.getRandomCountry)
    }


    getRandomCountry() {
        const random = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt1 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt2 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOpt3 = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        const randomOptions = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
        
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(randomOptions);

        this.setState({
            randomCountry: random,
            randomOptions: randomOptions,
            userIsWin: undefined,
            disableFieldset: false
        })
    }

    checkWin(event) {
        this.setState({
            disableFieldset: true
        })
        const winCountry = this.state.randomCountry.name;
        const userGuess = event;

        if (winCountry === userGuess) {
            this.setState({
                userIsWin: true,
                goodGuess: this.state.goodGuess + 1,
                bgColor: {backgroundColor: '#81C784'}
            })
        } else {
            this.setState({
                userIsWin: false,
                bgColor: {backgroundColor: '#FF8A65'}
            })
        }

        setTimeout(()=>{
            this.getRandomCountry();
            this.setState({
                userIsWin: undefined,
                disableFieldset: false,
                bgColor: {backgroundColor: '#FFFFFF'}
            })
        }, 2000)
    }


    render() {
        return (
            <div className="main" style={this.state.bgColor}>
                <div className="wrapper">
                    <h1>Country Guessing Game</h1>
                    <button className="rnd mui-btn mui-btn--raised" onClick={this.getRandomCountry}>Random</button>
                    <div className="img-container">
                        <img className="mui-panel" src={this.state.randomCountry.flag} alt="Country flag" />
                    </div>
                    <h2>{this.state.userIsWin === true ? 'You guess right! ' : ''}
                        {this.state.userIsWin === false ? 'You guess wrong. ' : ''} 
                        Score: {this.state.goodGuess}</h2>
                </div>
                <fieldset disabled={this.state.disableFieldset}>
                    <div className="btn-wrapper">
                        <button className="mui-btn mui-btn--raised" 
                            value={this.state.randomOptions[0]}
                            onClick={() => this.checkWin(this.state.randomOptions[0])}>
                            {this.state.randomOptions[0]}
                        </button>
                        <button className="mui-btn mui-btn--raised" 
                            value={this.state.randomOptions[1]}
                            onClick={() => this.checkWin(this.state.randomOptions[1])}>
                            {this.state.randomOptions[1]}
                        </button>
                        <button 
                            className="mui-btn mui-btn--raised" 
                            value={this.state.randomOptions[2]}
                            onClick={() => this.checkWin(this.state.randomOptions[2])}>
                            {this.state.randomOptions[2]}
                        </button>
                        <button 
                            className="mui-btn mui-btn--raised" 
                            value={this.state.randomOptions[3]}
                            onClick={() => this.checkWin(this.state.randomOptions[3])}>
                            {this.state.randomOptions[3]}
                        </button>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default Country;