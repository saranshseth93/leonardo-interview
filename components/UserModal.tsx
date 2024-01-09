import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Image,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import helloAnimation from "../public/animations/Hello.json";
import jobAnimation from "../public/animations/Job.json";

const UserModal: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const lottieSize = windowWidth < 768 ? "50vw" : "250px";

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify({ username, jobTitle }));
  }, [username, jobTitle]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJobTitle(e.target.value);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: step === 1 ? helloAnimation : jobAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} isClosable={false} size="3xl">
      <ModalOverlay />
      <ModalContent
        maxW="90%"
        mx={3}
        sx={{
          border: "2px solid #39ff14",
        }}
      >
        <ModalHeader
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          textAlign="center"
        >
          {step === 1 ? "Welcome!" : "Let's get to know you!"}
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
                    Sign Up
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
