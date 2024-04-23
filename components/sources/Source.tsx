// Library
import React, { useState } from "react";

// Constants
import { SourceProps } from "../../constants/types";

// Components
import EditSourceForm from "./EditSourceForm";
import SourceItem from "./SourceItem";
import EditSourceContainer from "./EditSourceContainer";

const Source: React.FC<SourceProps> = ({ item }) => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [onUpdatingSource, setOnUpdatingSource] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(item.title);
  const [amount, setAmount] = useState<string>(item.amount.toString());

  // Close all edit components
  const closeAll: () => void = () => {
    setOnEdit(false);
    setOnUpdatingSource(false);
  };

  return onEdit ? (
    !onUpdatingSource ? (
      <EditSourceContainer
        closeAll={closeAll}
        setOnUpdatingSource={setOnUpdatingSource}
        item={item}
      />
    ) : (
      <EditSourceForm
        item={item}
        title={title}
        amount={amount}
        setTitle={setTitle}
        setAmount={setAmount}
        closeAll={closeAll}
      />
    )
  ) : (
    <SourceItem item={item} setOnEdit={setOnEdit} />
  );
};

export default Source;
