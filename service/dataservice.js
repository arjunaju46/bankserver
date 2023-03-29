const jwt=require("jsonwebtoken")




userDetails = {
  1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1001: { username: "amal", acno: 1001, password: "abc123", balance: 0, transaction: [] },
  1003: { username: "arun", acno: 1003, password: "abc1723", balance: 0, transaction: [] },
  1004: { username: "anna", acno: 1004, password: "abc1823", balance: 0, transaction: [] }

}









register = (acno, uname, psw) => {
  if (acno in userDetails) {
    return {
      staus: false,
      message: "user already present ",
      statuscode: 404
    }

  }
  else {
    userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
    return {

      staus: true,
      message: "registerd ",
      statuscode: 200

    }
  }
}

login = (acno, psw) => {
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      currentUser = userDetails[acno]["username"]
      currentacno = acno

// token create
  const token= jwt.sign({acno},"aju123")


      return {

        staus: true,
        message: "login sucess",
        statuscode: 200,
        currentUser,
        currentacno,
        token


      }
    }
    else {
      return {
        staus: false,
        message: "incurrect password",
        statuscode: 404
      }
    }

  }
  else {
    return {
      staus: false,
      message: "incurect accuntnumber ",
      statuscode: 404
    }
  }

}


deposit = (acno, psw, amnt) => {

  // to convert string amnt to int
  var amount = parseInt(amnt)
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amount

      // add transaction datat in to a array
      userDetails[acno]["transaction"].push(
        {
          type: "credit",
          amount: amount
        }
      )
      return {
        staus: true,
        message: `your account ha sbeen credited with amount ${amount}
    and the balance is ${userDetails[acno]["balance"]}`,
        statuscode: 200,
      }






    }
    else {
      return {
        staus: false,
        message: "incurect password ",
        statuscode: 404
      }
    }

  }
  else {
    return {
      staus: false,
      message: "incurect acno ",
      statuscode: 404
    }
  }


}


withdrew = (acno, psw, amnt) => {

  // to convert string amnt to int
  var amount = parseInt(amnt)
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      if (amount <= userDetails[acno]["balance"]) {

        userDetails[acno]["balance"] -= amount

        // add transaction datat in to a array
        userDetails[acno]["transaction"].push(
          {
            type: "debit",
            amount: amount
          }
        )


        return {
          staus: true,
          message: `your account ha sbeen debited with amount ${amount}
            and the balance is ${userDetails[acno]["balance"]}`,
          statuscode: 200,
        }



      }
      else {
        return {
          staus: false,
          message: "insufficent balance ",
          statuscode: 404
        }
      }
    }
    else {
      return {
        staus: false,
        message: "incurect password ",
        statuscode: 404
      }
    }

  }
  else {
    return {
      staus: false,
      message: "incurect acno ",
      statuscode: 404
    }
  }


}


getTransaction = (acno) => {
  return {
    satus: true,
    transaction: userDetails[acno].transaction,
    statuscode: 200

  }
}









module.exports = {
  register, login, deposit, withdrew, getTransaction
}
