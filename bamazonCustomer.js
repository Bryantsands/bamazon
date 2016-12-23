var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:"root",

    password:"password",
    database: "bamazon_db"
})

connection.connect(function(error){
   
    console.log("connected as id " + connection.threadId)
})


    connection.query("SELECT * FROM products", function(error, response){
      
        for(var i=0; i<response.length; i++){
            console.log("ID: "+response[i].id + " | " +
                        "Product: " + response[i].product_name + " | " +
                        "Department: " + response[i].department_name + " | " +
                        "Price: " + response[i].product_price + " $ " +
                         "Quantity: " + response[i].quantity + " # " +
                         "\n-------------------");
            
            
       }   
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the product you'd like"
            },
            {
                name: "units",
                type: "input",
                message: "how many would you like"
            }
        ]).then(function(answer){
            id = answers.id;
            quantity = answers.units;
            console.log("something happened")
            connection.query("SELECT * FROM  products id = ?", [id], function(error, response){
                var amountAvailable = response[i].quantity;

                if(amountAvailable < quantity){
            console.log("insufficient quantity")
            return false;
                }else{
                    amountAvailable -= quantity;
                    var total = quantity * response[i].product_price;
                    console.log("your order was processed " + quantity + "of" + response[i].product_name + "for" + total);
                    connection.query("UPDATE products SET quantity = ? WHERE id = ?",
                    [amountAvailable, id], function (error, response){
                    if (error) throw error;
                    } ) 
                }
            })

        });
    })