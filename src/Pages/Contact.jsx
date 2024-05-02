import React from "react";
import { Card,  CardHeader, CardBody, CardFooter, Center } from '@chakra-ui/react'
import { Box, Flex, Text, Avatar, Heading, Stack, Divider, ButtonGroup, IconButton, Image, Button } from "@chakra-ui/react"

const Contact = () => {
    return (
      <div id="Concept" style={{height:"",paddingBlockEnd:"5%"}}>
        <h1 style={{fontSize:"50px",paddingLeft:"10%",paddingRight:"10%",paddingTop:"5%",paddingBlockEnd:"5%"}}>
          Concept
        </h1>
        <div class="fold">
          <div class="Card_size">
            </div>
            <div class="Card_size">
              <p class="icon_text">身近なところから環境保全に取り組もう</p>
              <p class="icon_text">プラスチックゴミを減らそう</p>
              <p class="icon_text">SDGsの達成に貢献しよう</p>
            </div>
        </div>
  
        <p style={{paddingLeft:"10%",paddingRight:"10%"}}>
        </p>
      </div>
    );
  };
  
  export default Contact;