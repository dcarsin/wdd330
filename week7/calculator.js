let calculator = {
    sum() {
        return this.a + this.b;
    },

    rest() {
        return this.a - this.b;
    },

    mul() {
        return this.a * this.b;
    },

    division() {
        return this.a / this.b;
    },

    read() {
        this.a = prompt('a?', 0);
        this.b = prompt('b?', 0);
        this.operator = prompt('For sum type: +\nFor rest type: -\nFor multiply type: *\nFor division type: /Default operator is: +\n * Please select operator: *', '+');

        console.log("this.a", this.a);
        console.log("this.b", this.b);
        console.log("this.operator", this.operator);
        if (this.operator == '+') {
            console.log("entro +");
            alert(calculator.sum());
        } else if (this.operator == '-') {
            console.log("entro -");
            alert(calculator.rest());
        } else if (this.operator == '*') {
            console.log("entro *");
            alert(calculator.mul());
        } else if (this.operator == '/') {
            console.log("entro /");
            alert(calculator.division());
        }
    }
};

calculator.read();