import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./Error";
const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
    };
    fetchExchanges();
  }, []);

  if(error) return <Error message={"Error while fetching exchanges"}/>
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
              key={i.id}
                name={i.name}
                url={i.url}
                rank={i.trust_score_rank}
                img={i.image}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;
