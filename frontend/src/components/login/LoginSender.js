import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../store/tokenSlice";
import { authInstance } from "../../instances/authInstance";
import React from "react";

export function LoginSender(props) {
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
          const response = await authInstance
            .post("/token/login", {
              username: props.username,
              password: props.password,
            })
            .catch((error) => error.response);
          if (response.status === 200) {
            const token = response.data.token;
            handleToken(token);
            navigate("/search");
            return;
          }
          if (response.status === 400) {
            props.showPopUp("Wrong username or password, please, try again");
          }
        }}
      >
        log in
      </button>
    </div>
  );
}
