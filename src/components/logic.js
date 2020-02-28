state = {
    input: "",
    previousNumber: "",
    currentNumber: "",
    operator: "", 
   };  

addInput = val => {
this.setState({ input: this.state.input + val });
};
clearInput = () => {
this.setState({ input: "" });
};
addZeroInput = val => {
if (this.state.input !== "") {
    this.setState({ input: this.state.input + val });
     }
};
addDecimal = val => {
if (this.state.input.indexOf(".") === -1) {
   this.setState({ input: this.state.input + val });
}
}

add = (val) => {
this.state.previousNumber = this.state.input;
this.setState({ input:val });
this.state.operator = "plus";
};

substarct = () => {
this.state.previousNumber = this.state.input;
this.setState({ input: "" });
this.state.operator = "substarct";
};

multiply = () => {
this.state.previousNumber = this.state.input;
this.setState({ input: "" });
this.state.operator = "multiply";
};

divide = () => {
this.state.previousNumber = this.state.input;
this.setState({ input: "" });
this.state.operator = "divide";
};

evaluate = () => {
this.state.currentNumber = this.state.input;
if (this.state.operator == "plus") {
   this.setState({
       input: parseInt(this.state.previousNumber) +
           parseInt(this.state.currentNumber)
   });
}
else if(this.state.operator == "substract"){
   this.setState({
       input: parseInt(this.state.previousNumber) -
           parseInt(this.state.currentNumber)
   });
}
else if(this.state.operator == "multiply"){
   this.setState({
       input: parseInt(this.state.previousNumber) *
           parseInt(this.state.currentNumber)
   });
}
else if(this.state.operator == "divide"){
   this.setState({
       input: parseInt(this.state.previousNumber) /
           parseInt(this.state.currentNumber)
   })
}
}