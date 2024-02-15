import React from "react";
import Image from "./Image";
import { imagesInstance } from "../../instances/imagesInstance";
import { connect } from "react-redux";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  updateImages(responseData) {
    let images = responseData.map((imageData) => ({
      id: imageData.id,
      url: imageData.url,
    }));
    this.setState({ images });
  }

  async componentDidMount() {
    await imagesInstance
      .get("/latest", {
        headers: {
          Authorization: "Token " + this.props.token.value,
        },
      })
      .then((response) => this.updateImages(response.data))
      .catch((error) => {
        if (error.response?.status === 404) {
          this.updateImages([]);
        }
      });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.searchText === prevProps.searchText ||
      !this.props.searchText
    ) {
      return;
    }

    await imagesInstance
      .get(`/search?text=${this.props.searchText}`, {
        headers: {
          Authorization: "Token " + this.props.token.value,
        },
      })
      .then((response) => this.updateImages(response.data))
      .catch((error) => {
        if (error.response?.status === 404) {
          this.updateImages([]);
        }
      });
  }

  render() {
    if (this.state.images.length) {
      let imagesComponents = this.state.images.map((image, idx) => (
        <div>
          <Image id={image.id} url={image.url} key={image.id} />
        </div>
      ));
      return <div>{imagesComponents}</div>;
    }
    return <p>No results :-(</p>;
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(SearchResult);
