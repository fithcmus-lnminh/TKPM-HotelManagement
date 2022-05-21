import React from "react";
import { Helmet } from "react-helmet";

const Meta = (props) => {
  const { title, description, keywords } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "TKPM Hotel",
  description: "We serve the best 5-star rooms",
  keywords: "room, hotel, 5-star",
};

export default Meta;
