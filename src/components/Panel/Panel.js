import React from "react";
import styles from "./Panel.css";

export default class Panel extends React.Component {
  render() {
    return <div className = {styles.block}>{this.props.children}</div>;
  }
}