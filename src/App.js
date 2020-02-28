import React, { Component } from 'react';
import  './App.css';
import Button from './components/Button/Button';
import Input from './components/Input';


 class App extends Component {
  state={
          input:"",
          result:"",
          prevInput:"",
       };

    parseCalculationString= (s) => {
        // --- Parse a calculation string into an array of numbers and operators
        var calculation = [],
            current = '';
        for (var i = 0, ch; ch = s.charAt(i); i++) {
            if ('%x/+-'.indexOf(ch) > -1) {
                if (current === '' && ch === '-') {
                    current = '-';
                } else {
                    calculation.push(parseFloat(current), ch);
                    current = '';
                }
            } else {
                current =current + s.charAt(i);
            }
        }
        if (current !== '') {
            calculation.push(parseFloat(current));
        }
        return calculation;
    }
    
     calculate= (calc) => {
        // --- Perform a calculation expressed as an array of operators and numbers
        var ops = [
                   {'x': (a, b) => a * b, '/': (a, b) => a / b, '%': (a, b) => ((a % b) +b) % b },
                   {'+': (a, b) => a + b, '-': (a, b) => a - b}
                  ],
        newCalc = [],
        currentOp;
        for (var i = 0; i < ops.length; i++) {
            for (var j = 0; j < calc.length; j++) {
                if (ops[i][calc[j]]) {
                    currentOp = ops[i][calc[j]];
                } else if (currentOp) {
                    newCalc[newCalc.length - 1] = 
                        currentOp(newCalc[newCalc.length - 1], calc[j]);
                    currentOp = null;
                } else {
                    newCalc.push(calc[j]);
                }
                console.log(newCalc);
            }
            calc = newCalc;
            newCalc = [];
        }
        if (calc.length > 1) {
            console.log('Error: unable to resolve calculation');
            return calc;
        } else {
            return calc[0];
        }
    }
    evaluate = () =>{
      let upatedRes=this.calculate( this.parseCalculationString(this.state.input));
      console.log(upatedRes);
      this.setState({result: upatedRes,prevInput: this.state.input, input:'' });
    }

    addInput = val => {
     
      if(this.state.input !==""){
         let lastchar=this.state.input.charAt(this.state.input.length-1);

         if( 'x/%+-'.indexOf(lastchar) >-1 && 'x/%+-'.indexOf(val) >-1){
              
              if( lastchar==='-' && 'x/'.indexOf( this.state.input.charAt(this.state.input.length - 2) ) >-1 && val !=='-'){
                let str= this.state.input.slice(0,this.state.input.length-2);
                str= str+val; 
                this.setState({input:str});
              }
              else if((lastchar==='x' || lastchar ==='/') && val==="-"){
                this.setState({input:this.state.input + val});
              }else if( val !== lastchar ){
                      let str = this.state.input.slice(0,this.state.input.length-1);
                      str= str + val;
                      this.setState({input:str});  
                    }
          }
          else{
                this.setState({input:this.state.input + val});
          };

          // if( '*/%+-'.indexOf(lastchar) ===-1 && '*/%+-'.indexOf(val) >-1){
          //   this.setState({input:this.state.input + val});
          // }
         console.log("i am not empty");
      }else{
        if(val !=='x' && val !=='/' && val !=='%' && val !=='+'){
          let updatedState ={
            ...this.state,
            input:this.state.input + val
          }
            this.setState(updatedState);
            console.log("i am empty");
        }
      }
    };

    clearInput = () => {
      let updatedState={
          input:"",
          result:"",
          prevInput:"",
      };
    this.setState(updatedState);
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
    };

    addSign = () => {
      if(this.state.input ===""){
          this.setState({input: this.state.input + '-'});
      }else if(this.state.input.length === 1 && this.state.input==='-'){
          this.setState({input:''});
      }else if(this.state.input.length=== 1 && this.state.input !=='-'){
          let str='-';
          str= str + this.state.input;
          this.setState({input: str});
      }else if(this.state.input.length >= 2 && this.state.input.indexOf('-') === 0 && this.state.input.indexOf('x') ===-1
               && this.state.input.indexOf('/') ===-1 && this.state.input.indexOf('%') ===-1 ){
          
          let str=this.state.input.slice(1);
          this.setState({input:str});
      }
      else if(this.state.input.length >= 2 && this.state.input.indexOf('-') ===-1 && this.state.input.indexOf('x') ===-1
               && this.state.input.indexOf('/') ===-1 && this.state.input.indexOf('%') ===-1 ) {
          
          let str='-';
          let newstr=str.concat(this.state.input);
          this.setState({input:newstr});
      }      
    };
      
  render() {
    return (
      <div className="App">
        <div className="cal-wrapper">
          <div>
          <Input type="input">{this.state.input !=="" ? this.state.input : this.state.prevInput}</Input>
          <Input type="result">{this.state.input !==""? null : this.state.result}</Input> 
          </div>       
          <div className="row">
            <Button handleClick={this.clearInput}>C</Button>
            <Button handleClick={this.addSign}>+/-</Button>
            <Button handleClick={this.addInput}>%</Button>
            <Button handleClick={this.addInput} btnType="operator">/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addInput}>7</Button>
            <Button handleClick={this.addInput}>8</Button>
            <Button handleClick={this.addInput}>9</Button>
            <Button handleClick={this.addInput} btnType="operator">x</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addInput}>4</Button>
            <Button handleClick={this.addInput}>5</Button>
            <Button handleClick={this.addInput}>6</Button>
            <Button handleClick={this.addInput} btnType="operator">-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addInput}>1</Button>
            <Button handleClick={this.addInput}>2</Button>
            <Button handleClick={this.addInput}>3</Button>
            <Button handleClick={this.addInput} btnType="operator">+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addZeroInput}>0</Button>
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.evaluate} btnType="operator">=</Button>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
