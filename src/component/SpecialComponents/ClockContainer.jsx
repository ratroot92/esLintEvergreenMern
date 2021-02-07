/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* Example Container and Presentation */
/* Logical Container Component  */
import React from "react";
import ClockWidget from "./ClockWidget";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {}

  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    this.setState(this.getTime, this.setTimer);
  }

  getTime() {
    const currentTime = new Date();
    return {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() >= 12 ? "pm" : "am",
    };
  }

  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout)
    }
  }

  /* Logical Presentational Component  */
  render() {
    const { hours, minutes, seconds, ampm } = this.state;
    return <ClockWidget props={this.state} />;
  }
}