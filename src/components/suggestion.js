import React from "react";

class Suggest extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      prefrence: localStorage.getItem("prefrence"),
      data: {},
      accept: localStorage.getItem("accept")
        ? JSON.parse(localStorage.getItem("accept"))
        : false,
      acctime: localStorage.getItem("acctime")
        ? JSON.parse(localStorage.getItem("acctime"))
        : "",
      menu: localStorage.getItem("menu")
        ? JSON.parse(localStorage.getItem("menu"))
        : []
    };
    this.getData();
    this.checktime();
  }
  async getData() {
    console.log(this.state.data)
    let d = await fetch(
      "https://raw.githubusercontent.com/niteenfrapp/foodapp/master/menu.json"
    );
    let m = await d.json();
    this.setState({ data: m });
    this.setState({loading: false})
    console.log(this.state.data)
  }
  checktime() {
    if (this.state.accept) {
      if (Date.now() - this.state.acctime > 2591973981) {
        this.setState({ accept: false });
        localStorage.setItem("accept", false);
      }
    }
  }
  accept() {
    if(this.state.menu.length>0){
      this.setState({ accept: true });
      localStorage.setItem("accept", true);
      localStorage.setItem("acctime", Date.now());
    }
  }
  random() {
    let data = [];
    console.log(this.state.data)
    for (let i = 0; i < 30; i++) {
      let catogs = Object.keys(this.state.data);
      let cato = catogs[Math.floor(Math.random() * catogs.length)];
      let subcatogs = Object.keys(this.state.data[cato]);
      let subcato = subcatogs[Math.floor(Math.random() * subcatogs.length)];
      let prefrence = localStorage.getItem("prefrence");
      if (prefrence == "nonveg") {
        prefrence = ["veg", "nonveg"][Math.floor(Math.random() * 2)];
      }
      let foods = this.state.data[cato][subcato][prefrence];
      if (this.state.data[cato][subcato].dependency.length > 0) {
        data.push({
          cato,
          subcato,
          dependency: this.state.data[cato][subcato].dependency,
          food: foods[Math.floor(Math.random() * foods.length)]
        });
      } else {
        data.push({
          cato,
          subcato,
          food: foods[Math.floor(Math.random() * foods.length)]
        });
      }
    }

    this.setState({
      menu: data
    });
    localStorage.setItem("menu", JSON.stringify(data));
  }
  render() {
    return (
      <div>
        <div className="header">
          <button className="accept" 
            disabled={this.state.accept}
            onClick={() => this.accept()}>
            Accept
          </button>
          <button
            className="random"
            disabled={this.state.accept && this.state.loading}
            onClick={() => this.random()}
          >
            Random
          </button>
        </div>
        <div className="body">
          <div className="fresh">Click Random meal for the next 30 days.</div>
          <div className="menu">
            {this.state.menu.map((data, i) => {
              return (
                <div className="card">
                  <div className="cato">{data.cato}</div>
                  <div className="subcato">{data.subcato}</div>
                  <div className="food">{data.food}</div>
                  <span className="day">Day {i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Suggest;
