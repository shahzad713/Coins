import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import Error from "./Error";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("pkr");
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setLoading(true);
    }
  };

  const currencySymbols = {
    inr: "₹",
    eur: "€",
    usd: "$",
    pkr : "Rs"
  };

  const currencySymbol = currencySymbols[currency] || "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        // Update total pages based on the number of items and itemsPerPage
        const calculatedTotalPages = Math.ceil(data.length / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message={"Error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
          <Radio value={"pkr"}>PKR</Radio>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((coin) => (
              <CoinCard
                id={coin.id}
                key={coin.id}
                price={coin.current_price}
                name={coin.name}
                symbol={coin.symbol}
                img={coin.image}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack spacing={2} justify="center" mt={4} mb={6} overflowX={"auto"}>
            <Button
              variant={"unstyled"}
              _hover={{ bgColor: page === 1 ? "blue.600" : "blue.300" }}
              onClick={() => changePage(page - 1)}
              isDisabled={page === 1}
            >
              <ChevronLeftIcon boxSize={10} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                bgColor={i + 1 === page ? "blue.500" : "transparent"}
                color={i + 1 === page ? "white" : "blackAlpha.900"}
                _hover={{
                  bgColor: i + 1 === page ? "blue.600" : "blue.300",
                }}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant={"unstyled"}
              _hover={{
                bgColor: page === totalPages ? "blue.600" : "blue.300",
              }}
              onClick={() => changePage(page + 1)}
              isDisabled={page === totalPages}
            >
              <ChevronRightIcon boxSize={10} />
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
