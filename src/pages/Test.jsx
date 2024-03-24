import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/reducer/TestSlice";

const Test = () => {
  const dispatch = useDispatch();

  const { value } = useSelector((state) => state.test);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        height: "100vh",
      }}
    >
      <Typography variant="h1">{value}</Typography>
      <Box>
        <Button onClick={() => dispatch(increment())} color="secondary" variant="contained">
          Increment
        </Button>
        <Button onClick={() => dispatch(decrement())} variant="contained">
          Decrement
        </Button>
      </Box>
    </Box>
  );
};

export default Test;
