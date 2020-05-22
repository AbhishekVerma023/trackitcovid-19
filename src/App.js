import React from 'react';

import {Cards, Charts ,CountryPicker, Footer } from './components';
// import { Footer } from './components/footerComponent';
import styles from './App.module.css';
import { fetchData } from './api';

import image from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
      }
    
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
       // console.log(this.country);
       // console.log(fetchedData);
        // fetch Data
    }
    render() {
        const { data,country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Cards data={data}/> 
                <Charts data={data} country={country}/>
                <Footer />
            </div>
        )    
    }
}

export default App;