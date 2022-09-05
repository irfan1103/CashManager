import React, { useState } from "react";
import "./styles.css";

var cashSplit = [2000, 500, 100, 20, 10, 5, 1];
var cash = [0, 0, 0, 0, 0, 0, 0];

export default function App() {
  var [order, setOrder] = useState("");
  var [amount, setAmount] = useState("");
  var [hidden, setHidden] = useState(false);
  var [hideAmount, setHideAmount] = useState(false);
  var [hideTable, setHideTable] = useState(false);
  var [split, setSplit] = useState([]);

  var totalOrder = function (e) {
    order = e.target.value;
    setOrder(order);
  };

  var toalAmount = function (e) {
    amount = e.target.value;
    setAmount(amount);
  };

  var checkOrder = function () {
    if (!order || order <= 0) {
      setHidden(true);
    } else {
      setHideAmount(true);
      setHidden(false);
    }
  };

  var calculateNetAmount = function () {
    var netAmount = amount - order;

    if (netAmount < 0 || !netAmount) {
      setHideTable(false);
      setHidden(true);
    }

    for (var i = 0; i <= cashSplit.length; i++) {
      if (netAmount / cashSplit[i] >= 1) {
        cash[i] = Math.floor(netAmount / cashSplit[i]);
        netAmount = netAmount % cashSplit[i];
        setSplit((cash) => [...cash], cash[i]);
      }
    }
  };

  var dataValidator = function () {
    cash = [0, 0, 0, 0, 0, 0, 0];
    if (!amount || amount <= 0) {
      setHidden(true);
      setHideTable(false);
    } else if (!order || order <= 0) {
      setHidden(true);
      setHideAmount(false);
      setHideTable(false);
    } else {
      setHideTable(true);
      setHidden(false);
      calculateNetAmount();
    }
  };

  function resetter() {
    setHideTable(false);
    setHideAmount(false);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Cash Register Manager</h1>
        <p>
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </p>
        <section>
          {!hideAmount && (
            <div>
              <label for="order">
                <h2>Bill Amount:</h2>
              </label>
              <input type="number" onChange={totalOrder} id="order" />
              <button type="button" onClick={checkOrder}>
                Next
              </button>
            </div>
          )}
        </section>
        {hideAmount && (
          <section>
            <h2> Bill Amount: {order}</h2>
            <label for="amount">
              <h2>Cash Given: </h2>
            </label>
            <input type="number" onChange={toalAmount} id="amount" />
            <button type="button" onClick={dataValidator}>
              Check
            </button>
          </section>
        )}
        {hideTable && (
          <section id="tables">
            <h2>Return Change: </h2>
            <table>
              <tr>
                <th>Notes</th>
                {cashSplit.map((items) => {
                  return <th>{items}</th>;
                })}
              </tr>
              <tr>
                <th>No.of Notes</th>
                {cashSplit.map((items, index) => {
                  return <th>{cash[index]}</th>;
                })}
              </tr>
            </table>
            <button onClick={resetter} type="reset">
              Reset
            </button>
          </section>
        )}
        <div>{hidden && <h2>PLease, Enter the Amounts Correctly!</h2>}</div>
      </div>
    </div>
  );
}
