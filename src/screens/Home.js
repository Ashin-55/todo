import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../App.css";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("enter todo item"),
});
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit = (data) => {
    setTodos([...todos, data]);
    reset({ title: "" });
  };
  const removeTodo = (data) => {
    const index = todos.findIndex((x) => x.title === data);
    todos.splice(index, 1);
    setRefresh(!refresh);
  };

  useEffect(() => {}, [refresh]);
  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>TODO</h2>

      <Box
        sx={{
          display: "flex",
          marginTop: "2%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          variant='outlined'
          name='title'
          label='Title'
          size='small'
          {...register("title")}
          error={errors.title ? true : false}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ color: "black", borderColor: "black" }}
          variant='outlined'
        >
          Submit
        </Button>
      </Box>
      <Typography color='red'>{errors.title?.message}</Typography>

      <Typography sx={{ marginTop: "2%" }}>
        Todo List
      </Typography>

      {todos.length < 1 && <h2>No list</h2>}
      {todos?.map((list) => (
        <Box
          sx={{
            display: "flex",
            marginTop: "1%",
            alignItems: "center",
            justifyContent: "center",
          }}
          key={list.title}
        >
          <Typography
            sx={{
              minWidth: "11%",
              border: 1,
              textAlign: "center",
              padding: "5px",
            }}
          >
            {list.title}
          </Typography>
          <Button
            variant='outlined'
            sx={{ borderColor: "black" }}
            onClick={() => removeTodo(list.title)}
          >
            <CloseIcon sx={{ color: "black" }} />
          </Button>
          <Button
            variant='outlined'
            sx={{ borderColor: "black" }}
            onClick={() => removeTodo(list.title)}
          >
            <DoneIcon sx={{ color: "black" }} />
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
