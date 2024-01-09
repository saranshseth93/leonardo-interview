import React, { useState, useEffect } from "react";
// Importing necessary components from Chakra UI and Lottie for animations
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  FormLabel,
  Flex,
  ModalCloseButton,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import helloAnimation from "../public/animations/Hello.json";
import jobAnimation from "../public/animations/Job.json";

// Type definitions for props
type UserModalProps = {
  setHasSignedUp: (hasSignedUp: boolean) => void;
  isProfileEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const UserModal: React.FC<UserModalProps> = ({
  setHasSignedUp,
  isProfileEdit,
  isOpen,
  onClose,
}) => {
  // State for managing steps, username, jobTitle and window width
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState(0);

  // Effect to retrieve data from localStorage and set up window resize listener
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { username, jobTitle } = JSON.parse(userData);
      setUsername(username);
      setJobTitle(jobTitle);
    }

    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lottie animation size adjustment based on window width
  const lottieSize = windowWidth < 768 ? "50vw" : "250px";

  // Effect to update localStorage whenever username or jobTitle changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify({ username, jobTitle }));
  }, [username, jobTitle]);

  // Effect to reset to the first step when isProfileEdit changes
  useEffect(() => {
    if (isProfileEdit) {
      setStep(1);
    }
  }, [isProfileEdit]);

  // Handlers for input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJobTitle(e.target.value);

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: step === 1 ? helloAnimation : jobAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const closeModal = () => {
    setHasSignedUp(true);
    onClose();
  };

  // Decide modal title based on the context (sign up or profile edit or step)
  const decideTitle = () => {
    if (isProfileEdit) {
      return "Edit Profile";
    } else {
      return step === 1 ? "Welcome!" : "Let's get to know you!";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      onClose={closeModal}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent
        maxW="90%"
        mx={3}
        sx={{
          border: "2px solid #39ff14",
        }}
      >
        {isProfileEdit && <ModalCloseButton onClick={onClose} />}
        <ModalHeader
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          textAlign="center"
        >
          {decideTitle()}
        </ModalHeader>
        <ModalBody pb={10}>
          {step === 1 ? (
            <>
              <Lottie
                options={defaultOptions}
                height={lottieSize}
                width={lottieSize}
              />
              <FormLabel mt={4}>How should we know you?</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              {username.trim() !== "" && (
                <Flex justify="flex-end">
                  <Button mt={6} onClick={() => setStep(2)}>
                    Next
                  </Button>
                </Flex>
              )}
            </>
          ) : (
            <>
              <Lottie
                options={defaultOptions}
                height={lottieSize}
                width={lottieSize}
              />
              <FormLabel mt={4}>What is your job title?</FormLabel>
              <Input
                placeholder="Job Title"
                value={jobTitle}
                onChange={handleJobTitleChange}
              />
              <Flex justify="space-between">
                <Button mt={6} onClick={() => setStep(1)}>
                  Back
                </Button>
                {jobTitle.trim() !== "" && (
                  <Button mt={6} onClick={closeModal}>
                    {isProfileEdit ? "Update" : "Sign Up"}
                  </Button>
                )}
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
