import React from "react";
import { imagesInstance } from "../../instances/imagesInstance";
import { connect } from "react-redux";
import { deletedImgURL } from "../constants";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      image_url: props.url,
    };
  }

  render() {
    return (
      <div className={"image-container"}>
        <img
          className={"image"}
          src={this.state.image_url}
          alt={""}
          onClick={() => {
            const newWindow = window.open(
              this.state.image_url,
              "_blank",
              "noopener,noreferrer"
            );
            if (newWindow) newWindow.opener = null;
          }}
        />
        <button
          className={"delete-button"}
          onClick={async () => {
            await imagesInstance.delete(`/delete?id=${this.state.id}`, {
              headers: {
                Authorization: "Token " + this.props.token.value,
              },
            });

            this.setState({
              image_url: deletedImgURL,
            });
          }}
        >
          x
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Image);
