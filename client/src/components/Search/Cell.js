import * as React from "react";
import { cell, fixed } from "../../assets/jss/components/searchStyle";

export default function Cell({ content, isHeader, isFixed, height }) {
  var className = getClassName(isHeader, isFixed);

  if (height) {
    className = { ...className, ...cell, height: height };
  }

  const cellMarkup = isHeader ? (
    <th style={className}>{content}</th>
  ) : (
    <td style={className}>{content}</td>
  );

  return cellMarkup;
}

function getClassName(isHeader, isFixed) {
  var className = cell;
  if (isHeader && isFixed) {
    className = fixed;
  } else if (isHeader) {
    className = cell;
  } else if (isFixed) {
    className = fixed;
  }

  return className;
}
