import * as React from "react";
import {
  cell,
  header,
  fixed,
  fixedHeader
} from "../../assets/jss/components/searchStyle";

export default function Cell({ content, isHeader, isFixed }) {
  var className = cell;
  if (isHeader && isFixed) {
    className = fixed;
  } else if (isHeader) {
    className = cell;
  } else if (isFixed) {
    className = fixed;
  }

  const cellMarkup = isHeader ? (
    <th style={className}>{content}</th>
  ) : (
    <td style={className}>{content}</td>
  );

  return cellMarkup;
}
