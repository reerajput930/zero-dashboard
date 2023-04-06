import React, { useState } from "react";
import MojoAuth from "mojoauth-web-sdk";

function Testing() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const [payload, setPayload] = useState(null);

  console.log("1,begin the game");

  //  1 Initialize and show the form
  React.useEffect(() => {
    const mojoauth = new MojoAuth("aeb23e0c-5499-4e08-9051-0d400f8e4542", {
      language: "language_code",
        redirect_url: "https://blog.logrocket.com/creating-split-otp-input-fields-react-native/",
        // redirect_url: : 'http://localhost:3000/tasks'
      source: [
        { type: "email", feature: "otp" },
        { type: "phone", feature: "otp" },
      ],
    });
    mojoauth.signIn().then(payload => {
      setPayload(payload)
      document.getElementById("mojoauth-passwordless-form").remove();
    })

    
  });

  return (
    <div>
      {/*  2 Put a <div> that will contain the form */}
      <div id="mojoauth-passwordless-form" />

      <pre>{JSON.stringify(payload, null, 4)}</pre>
    </div>
  );
}

export default Testing;
