import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../store/tokenSlice";
import { authInstance } from "../../instances/authInstance";
import React from "react";

export function RegistrationSender(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleToken(token) {
    dispatch(update(token));
  }

  return (
    <div>
      <button
        className={"auth-button"}
        onClick={async () => {
          let regResponse = await authInstance
            .post("/register", {
              username: props.username,
              password: props.password,
            })
            .catch((error) => error.response);
          if (regResponse.status === 201) {
            props.showPopUp("Successfully registered!");
            let tokenResponse = await authInstance.post("/token/login", {
              username: props.username,
              password: props.password,
            });
            const token = tokenResponse.data.token;
            handleToken(token);
            navigate("/search/");
          }
          if (regResponse.status === 400) {
            props.showPopUp(
              "Error, possibly this account already exists. Try another username and password"
            );
          }
        }}
      >
        register
      </button>
    </div>
  );
}
