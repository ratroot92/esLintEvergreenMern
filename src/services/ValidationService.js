export default {
    validateEmail: (email) => {  
      return fetch("/validate/email", {
        method: "post",
        body: JSON.stringify({email:email}),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json())
      .then((data) => data);
  
   
  }

}
  