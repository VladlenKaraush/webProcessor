import React, { Component } from "react";

class Table extends Component {
  state = {
    headers: [
      "reg0",
      "reg1",
      "reg2",
      "reg3",
      "reg4",
      "reg5",
      "reg6",
      "reg7",
      "dec"
    ],
    headers_result: [
      "reg0",
      "reg1",
      "reg2",
      "reg3",
      "reg4",
      "reg5",
      "reg6",
      "reg7",
      "reg8",
      "reg9",
      "reg10",
      "reg11",
      "reg12",
      "reg13",
      "reg14",
      "reg15",
      "dec"
    ],
    bytes: [{ id: 0, value: 6 }, { id: 1, value: 7 }, { id: 2, value: 9 }],
    result: { value: 1 }
  };
  bgColors = {
    Default: "#81b71b",
    Blue: "#00B1E1",
    Cyan: "#37BC9B",
    Green: "#8CC152",
    Red: "#E9573F",
    Yellow: "#F6BB42",
    White: "#FFFFFF"
  };

  binarize = byte => {
    let number = byte.value;
    const bits = [];
    for (let index = 0; index < 8; index++) {
      const key = index.toString();
      bits.push(
        number % 2 === 0 ? (
          <td
            className="align-middle text-center"
            key={key}
            onClick={() => this.onClickCell(byte, index)}
          >
            0
          </td>
        ) : (
          <td
            className="align-middle text-center"
            key={key}
            onClick={() => this.onClickCell(byte, index)}
          >
            1
          </td>
        )
      );
      number = Math.floor(number / 2);
    }
    return bits;
  };

  binarizeResult = byte => {
    let number = byte.value;
    const bits = [];
    for (let index = 0; index < 16; index++) {
      const key = index.toString();
      bits.push(
        number % 2 === 0 ? (
          <td className="align-middle text-center" key={key}>
            0
          </td>
        ) : (
          <td className="align-middle text-center" key={key}>
            1
          </td>
        )
      );
      number = Math.floor(number / 2);
    }
    return bits;
  };

  chooseColor = byte => {
    if (byte > 8) return this.bgColors.Red;
    else if (byte > 6) return this.bgColors.Yellow;
    else return this.bgColors.Default;
  };

  addByte = () => {
    const bytes = [...this.state.bytes];
    bytes.push({ id: bytes.length, value: 0 });
    this.setState({ bytes });
  };

  deleteByte = byte => {
    let bytes = [...this.state.bytes];
    bytes = bytes.filter(el => el !== byte);
    this.setState({ bytes });
  };

  onClickCell = (byte, ind) => {
    const index = this.state.bytes.indexOf(byte);
    let val = byte.value;
    for (let index = 0; index < ind; index++) {
      val = Math.floor(val / 2);
    }
    if (val % 2 === 0) byte.value += Math.pow(2, ind);
    else byte.value -= Math.pow(2, ind);

    const bytes = [...this.state.bytes];
    bytes[index] = byte;
    this.setState({ bytes });
  };

  render() {
    const headers = this.state.headers.map(header => (
      <th scope="col" key={header}>
        {header}
      </th>
    ));

    const headersResult = this.state.headers_result.map(header => (
      <th scope="col" key={header}>
        {header}
      </th>
    ));

    const bytes = this.state.bytes.map((byte, ind) => (
      <tr key={ind} style={{ backgroundColor: this.chooseColor(byte.value) }}>
        {this.binarize(byte)}
        <td className="align-middle text-center" key={byte.id}>
          {byte.value}
        </td>
        <td
          style={{
            backgroundColor: this.bgColors.White,
            borderColor: this.bgColors.White
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => this.deleteByte(byte)}
          >
            delete
          </button>
        </td>
      </tr>
    ));

    const result = (
      <tr key="result" style={{ backgroundColor: this.bgColors.White }}>
        {this.binarizeResult(this.state.result)}
        <td className="align-middle text-center">{this.state.result.value}</td>
        <td
          style={{
            backgroundColor: this.bgColors.White,
            borderColor: this.bgColors.White
          }}
        ></td>
      </tr>
    );

    return (
      <div className="container" style={{ marginTop: 80 }}>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{bytes}</tbody>
        </table>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              style={{ margin: 10 }}
              onClick={this.addByte}
            >
              Add new row
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: 10 }}
              onClick={this.addByte}
            >
              Multiply
            </button>
            <button
              className="btn btn-primary"
              style={{ margin: 10 }}
              onClick={this.addByte}
            >
              Summarize
            </button>

            <h2>Результат</h2>
            <table className="table table-sm table-bordered">
              <thead>
                <tr>{headersResult}</tr>
              </thead>
              <tbody>{result}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
