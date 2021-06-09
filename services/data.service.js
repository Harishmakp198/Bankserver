let accountDetails= {
    1000: { acno: 1000, name: "Harishma", balance: 5000, password: "user1" },
    1002: { acno: 1002, name: "Reshma",   balance: 3000, password: "user2" },
    1003: { acno: 1003, name: "userthree",balance: 5000, password: "user3" },
    1004: { acno: 1004, name: "userfour", balance: 5000, password: "user4" },
    1005: { acno: 1005, name: "userfour", balance: 5000, password: "user5" }
}
let currentUser;
 const register=(acno,name,password) =>{
    console.log("register called")

    if(acno in accountDetails){
     
      return {
          status:false,
          statusCode:422,
          message:"user already exist..please login"
      }
    }
    
    accountDetails[acno]={
      acno,
      name,
      balance:0,
      password
    }
  //  this.saveDetails();
    
    console.log(accountDetails);
    return {
        status:true,
        statusCode:200,
        message:"Registration successful"
    }
    }
     const login=(req,acno,pwd)=>{
        let data =accountDetails;
        if (acno in data) {
          var psw1 = data[acno].password
          if (psw1 == pwd) {
            //currentUser=data[acno].name;
            req.session.currentUser=data[acno].name
           // this.saveDetails();
           
            return{
                status:true,
                statusCode:200,
                message:"Login  successful"
            }
            }
          else {
            return{
                status:false,
                statusCode:422,
                message:"incorrect password"
            }
          }
        }
        else {
            return{
                status:false,
                statusCode:422,
                message:"No user exist with provided account number"
            }
        
        }
      }
      //  const deposit=(req,acno,pwd,amount)=>{
       
        const deposit=(acno,pwd,amount)=>{
        var amt=parseInt(amount);
       let data =accountDetails;
       if (acno in data) {
         var psw1 = data[acno].password
         if (psw1 == pwd) {
           data[acno].balance+=amt
          // this.saveDetails();
        return{
            status:true,
            statusCode:200,
            message:"Account has been credited",
            balance:data[acno].balance
        }
           
           }
         else {
            return{
                status:false,
                statusCode:422,
                message:"Incorrect password",
            
            }
        }
           
         }
       
       else {
        return{
            status:false,
            statusCode:422,
            message:"no user exist with provided accno ",
           
        }
     
         
       }
      }
     
    const withdraw=(acno,pwd,amount)=>{

        var amt=parseInt(amount);
        let data=accountDetails;
        var amnt=data[acno].balance
        if(acno in data){
        var psw1=data[acno].password
        if(psw1==pwd){
          if(amnt>=amt){
            amnt-=amt
            return{
                status:true,
                statusCode:200,
                message:"amount is debited with "+amt+ "and your new balance is" +amnt,
                balance:amnt
            }
        }
          else{
            return{
                status:false,
                statusCode:422,
                message:"Insufficient balance",
          
            }
          }
        }
        else{
          return{
              status:false,
              statusCode:422,
              message:"Incorrect password"
          }
        }
      }
      
    
    }
    


    module.exports={
        register,
        login,
        deposit,
        withdraw
    }