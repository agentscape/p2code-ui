"use client";

import { askQuestion } from "@app/actions";
import {
  LiveHelp,
  LiveHelpOutlined,
  Person,
  SmartToy,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { useChat } from "@ai-sdk/react";
import { useList } from "@refinedev/core";

const AskQuestionCard = () => {
  const [question, setQuestion] = React.useState("");

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
  } = useChat({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClickOpen();
    handleSubmit();
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMessages([]);
    setOpen(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"P2CODE AI"}</DialogTitle>
        <DialogContent>
          {messages.map((message) => (
            <div key={message.id} data-color-mode="light">
              <div className="wmde-markdown-var"> </div>
              {message.role === "user" ? (
                <Person />
              ) : (
                <SmartToy sx={{ alignContent: "end" }} />
              )}
              <MDEditor.Markdown
                source={message.content}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          {(status === "submitted" || status === "streaming") && (
            <CircularProgress size={12} />
          )}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Stack gap={1}>
              <TextField
                placeholder="Type your question here"
                value={input}
                onChange={handleInputChange}
                multiline
                name="prompt"
              />
              <Button type="submit">Ask P2CODE AI</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
