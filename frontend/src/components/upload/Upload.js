import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { imagesInstance } from "../../instances/imagesInstance";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";
import styles from "../../modal.css.js";

async function sendImage(file, token) {
  let data = new FormData();
  data.append("image", file, file.name);

  return await imagesInstance
    .post("/upload", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: "Token " + token,
      },
    })
    .catch((error) => error.request);
}

export function UploadField(props) {
  const token = useSelector((state) => state.token);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();

      reader.onload = async () => {};
      reader.readAsArrayBuffer(file);
      props.showPopUp("Please, wait...");
      const response = await sendImage(file, token.value);
      if (response.status === 201) {
        props.showPopUp("Successfully loaded");
        return
      }
      if (response.status === 406) {
        props.showPopUp("Sorry, invalid file :(");
        return
      }
      else {
        props.showPopUp("Sorry, unknown error :(")
        return
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p className={"dnd"}>
        <b>Choose a file</b> or drag it here
      </p>
    </div>
  );
}

export class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showModal: false,
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

  render() {
    return (
      <div>
        <UploadField
          showPopUp={(text) => {
            this.setState({ text });
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
            <p>{this.state.text}</p>
          </div>
          <button className={"modal-button"} onClick={this.handleCloseModal}>
            Close
          </button>
        </ReactModal>
      </div>
    );
  }
}
