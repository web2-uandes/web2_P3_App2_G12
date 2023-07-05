import React, { useContext, useState } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import API_CONTEXT from "./APIContext";
import { sendQuestion } from "./Fetchs";

export default function SemiOpenQuestion({ options, hookState, setHookState }) {
  const [searchValue, setSearchValue] = useState("");

  const { invitation } = useContext(API_CONTEXT);

  const handleSearchInputChange = (event, value) => {
    const inputValue = event?.target?.value || value;
    setSearchValue(inputValue === null ? "" : inputValue);
  };

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      if (option === null || inputValue === null) {
        return "";
      } else {
        if (inputValue.length < 2) return "";
        return option.toLowerCase().includes(inputValue.toLowerCase());
      }
    });
  };

  const handleNextQuestion = async () => {
    // Handle the selected value here, e.g., pass it to an API call or perform some other action
    console.log("Selected Value:", searchValue);
    await sendQuestion(invitation, searchValue);
    setHookState(!hookState);
  };

  return (
    <Box display="flex" p={0.2} borderRadius={1}>
      <Autocomplete
        sx={{
          "&& .MuiInputBase-root": {
            padding: 0.1,
            paddingTop: 0.2,
            paddingLeft: 0.5,
          },
        }}
        value={searchValue}
        onChange={(event, value) => setSearchValue(value)}
        inputValue={searchValue}
        onInputChange={handleSearchInputChange}
        options={options}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField
            style={{ width: 200 }}
            {...params}
            placeholder="Search"
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleNextQuestion();
              }
            }}
          />
        )}
      />

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleNextQuestion}
      ></button>
    </Box>
  );
}
