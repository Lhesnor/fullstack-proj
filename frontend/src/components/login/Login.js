import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import ReactModal from "react-modal";
import { LoginSender } from "./LoginSender";
import styles from "../../modal.css";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showModal: false,
      popUpText: "",
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  credentialHandler = (credentialName, credentialValue) =>
    this.setState({ [credentialName]: credentialValue });

  render() {
    return (
      <div>
        <LoginInput credentialHandler={this.credentialHandler} />
        <LoginSender
          username={this.state.username}
          password={this.state.password}
          showPopUp={(text) => {
            this.setState({ popUpText: text });
            this.handleOpenModal();
          }}
        />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Modal"
          style={styles.modal}
          ariaHideApp={false}
        >
          <div>
            <p>{this.state.popUpText}</p>
          </div>
          <button className={"modal-button"} onClick={this.handleCloseModal}>
            Close
          </button>
        </ReactModal>
        <Link to={"/registration"} className={"auth-link"}>
          Create new account
        </Link>
      </div>
    );
  }
}
