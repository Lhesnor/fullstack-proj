import React from "react";
import RegistrationInput from "./RegistrationInput";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { RegistrationSender } from "./RegistrationSender";
import styles from "../../modal.css";

export class Registration extends React.Component {
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
        <RegistrationInput credentialHandler={this.credentialHandler} />
        <RegistrationSender
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
          ariaHideApp={false}
          style={styles.modal}
        >
          <div>
            <p>{this.state.popUpText}</p>
          </div>
          <button className={"modal-button"} onClick={this.handleCloseModal}>
            Close
          </button>
        </ReactModal>
        <Link to={"/login"} className={"auth-link"}>
          I already have an account
        </Link>
      </div>
    );
  }
}
