import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { nameToAvatar } from "../utils";
import { FormContainer, NameInput, CreateButton } from "../styles";
import { UserProfileProps } from "../types/userProfileProps";

export const CreateProfile = ({
  userProfile,
  setUserProfile,
}: UserProfileProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<boolean>(true);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setInputValue(event.target.value);
  };

  useEffect(() => {
    document.title = "Создать профиль - Sad Hamster";
  }, []);
  const handleSetUserProfile = () => {
    if (inputValue.length < 4) {
      setErrorMessage("Минимум 4 символа");
    } else if (inputValue.length > 16) setErrorMessage("Максимум 16 символов");
    else {
      setUserProfile({
        ...userProfile,
        name: inputValue,
        createdAt: new Date(),
      });
    }
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 18,
            padding: 4,
            fontFamily: "Inter",
          },
        }}
        open={dialog}
        onClose={() => setDialog(false)}
      >
        <DialogTitle>Похоже, у тебя ещё нет профиля</DialogTitle>
        <DialogContent>
          Ты можешь создать его прямо сейчас, введя имя хомяка.
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              fontSize: ".9rem",
              borderRadius: 12,
              fontFamily: "Inter",
            }}
            onClick={() => setDialog(false)}
          >
            ок
          </Button>
        </DialogActions>
      </Dialog>
      <FormContainer>
        <Avatar
          style={{
            width: "96px",
            height: "96px",
            fontSize: "36px",
            background: "#f472b6",
            boxShadow: "0 0 30px -1px #f472b6cb",
          }}
        >
          {inputValue !== "" ? nameToAvatar(inputValue) : null}
        </Avatar>
        <br />
        <NameInput
          error={errorMessage !== null}
          helperText={errorMessage}
          label="Введите имя хомяка"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSetUserProfile()}
        />
        <br />
        <CreateButton onClick={handleSetUserProfile}>
          Сохранить профиль
        </CreateButton>
      </FormContainer>
    </>
  );
};
