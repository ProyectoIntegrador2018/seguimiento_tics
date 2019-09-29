import * as React from "react";
import { cell } from "../../assets/jss/components/searchStyle";

export default function Cell({ content, header }) {
  const cellMarkup = header ? (
    <th>{content}</th>
  ) : (
    <td style={cell}>{content}</td>
  );

  return cellMarkup;
}
