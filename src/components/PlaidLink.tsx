import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions } from "react-plaid-link";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { CreateLinkToken } from "@/lib/actions/user.actions";
import { exchangePublicToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [Linktoken, setLinktoken] = useState("");
  useEffect(() => {
    const gettoken = async () => {
      const response = await CreateLinkToken({ user });
      setLinktoken(response?.link_token);
    };
    gettoken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      const response = await exchangePublicToken({ publicToken: public_token, user });
      const access_token = response.data.access_token;
      console.log(access_token);
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    onSuccess,
    token: Linktoken,
  };
  const { open, exit, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          className="px-24 bg-blue-500 hover:bg-blue-400"
          onClick={() => open()}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button className="px-24 bg-blue-500 hover:bg-blue-400">
          Connect Bank
        </Button>
      ) : (
        <Button className="px-24 bg-blue-500 hover:bg-blue-400">
          Connect Bank
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
