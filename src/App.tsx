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

type Menu = { onClick?: () => void; title: string; icon: React.ReactNode };

function App() {
  const username = "tester";
  const email = "tester@email.com";
  const projectId = "askfjoiawefjasdfmzcxweaf";

  const menu: Menu[] = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      title: "PoS",
      icon: <FaCashRegister />,
    },
    {
      title: "Inventory",
      icon: <FaWarehouse />,
    },
    {
      title: "Employee",
      icon: <BiSolidGroup />,
    },
    {
      title: "Report",
      icon: <GoGraph />,
    },
    {
      onClick: () => {
        window.open(
          `https://crafting-ticket-dev.web.app/?username=${username}&email=${email}&projectId=${projectId}`,
          "_blank"
        );
      },
      title: "แจ้งปัญหา",
      icon: <RiCustomerService2Fill />,
    },
    {
      title: "Setting",
      icon: <AiFillSetting />,
    },
    {
      title: "Logout",
      icon: <FiLogOut />,
    },
  ];

  return (
    <Box w="100vw" h="100dvh" bg="#232323" color="#fff">
      <Box
        position="fixed"
        top="0px"
        display={["flex", "none", "none", "none", "none", "none"]}
        w="100%"
        p="0.5rem"
        bg="#000"
      >
        <MenuDrawer menu={menu} />
        <Heading textAlign={"center"} w="full">
          Brand Logo
        </Heading>
      </Box>
      <Box w="100%" flex={"auto"} h="100%" overflow="auto" display="flex">
        <Box
          w="15%"
          className={classes.navBar}
          h="100%"
          overflowY={"auto"}
          display={["none", "block", "block", "block", "block", "block"]}
        >
          <Heading className={classes.logo}>Brand Logo</Heading>
          <Box className={classes.navPanel}>
            {menu.map((m, index) => {
              return (
                <Box key={index} onClick={m.onClick}>
                  {m.icon}
                  <Text className={classes.navText}>{m.title}</Text>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          w="100%"
          // display="flex"
          // justifyContent={"center"}
          // alignItems={"center"}
          className={classes.webContent}
          overflowY="auto"
          maxH="100vh"
          pt={["3.5rem", "0", "0", "0", "0", "0"]}
        >
          <Box w="100%" h="100%">
            Web Content
          </Box>
          {/* <Box w="100%" h="500px" bg="red.100"></Box>
          <Box w="100%" h="500px" bg="red.50"></Box>
          <Box w="100%" h="500px" bg="red.200"></Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

interface MenuDrawerProps {
  menu: Menu[];
}
const MenuDrawer: React.FC<MenuDrawerProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menu = props.menu;
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
        <DrawerContent bg="#333" color="#fff">
          <DrawerCloseButton />
          <DrawerBody className={classes.navPanelDrawer}>
            <Heading fontFamily={"inherit"} textAlign={"center"}>
              Menu
            </Heading>
            {menu.map((i, index) => {
              return (
                <Box key={index} onClick={i.onClick}>
                  {i.icon}
                  {i.title}
                </Box>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
