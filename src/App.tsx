import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Text,
  useDisclosure,
  DrawerCloseButton,
} from "@chakra-ui/react";
import classes from "./App.module.css";
import { AiFillSetting } from "react-icons/ai";
import { FaCashRegister, FaWarehouse } from "react-icons/fa";
import { BiSolidGroup, BiSolidDashboard } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoGraph } from "react-icons/go";

function App() {
  const username = "tester";
  const email = "tester@email.com";
  const projectId = "askfjoiawefjasdfmzcxweaf";

  return (
    <Box w="100vw" h="100dvh" bg="#232323" color="#fff">
      <Box
        display={["block", "none", "none", "none", "none", "none"]}
        w="100%"
        p="0.5rem"
      >
        <MenuSidebar />
      </Box>
      <Box w="100%" flex={"auto"} h="full" overflow="auto" display="flex">
        <Box
          w="15%"
          className={classes.navBar}
          display={["none", "block", "block", "block", "block", "block"]}
        >
          <Heading className={classes.logo}>Brand Logo</Heading>
          <Box className={classes.navPanel}>
            <Box>
              <BiSolidDashboard />
              <Text className={classes.navText}>Dashboard</Text>
            </Box>
            <Box>
              <FaCashRegister />
              <Text className={classes.navText}>PoS</Text>
            </Box>
            <Box>
              <FaWarehouse />
              <Text className={classes.navText}>Inventory</Text>
            </Box>
            <Box>
              <BiSolidGroup />
              <Text className={classes.navText}>Employee</Text>
            </Box>
            <Box>
              <GoGraph />
              <Text className={classes.navText}>Report</Text>
            </Box>
            <Box
              onClick={() => {
                window.open(
                  `https://crafting-ticket-dev.web.app/?username=${username}&email=${email}&projectId=${projectId}`,
                  "_blank"
                );
              }}
            >
              <RiCustomerService2Fill />
              <Text className={classes.navText}>แจ้งปัญหา</Text>
            </Box>
            <Box>
              <AiFillSetting />
              <Text className={classes.navText}>Setting</Text>
            </Box>
            <Box>
              <FiLogOut />
              <Text className={classes.navText}>Logout</Text>
            </Box>
          </Box>
        </Box>
        <Box
          w="100%"
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          className={classes.webContent}
        >
          Web Content
        </Box>
      </Box>
    </Box>
  );
}

export default App;

const MenuSidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant={"unstyled"}
        onClick={onOpen}
        border="1px solid #aaa5"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RxHamburgerMenu />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#333">
          <DrawerCloseButton color="#fff" />
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
