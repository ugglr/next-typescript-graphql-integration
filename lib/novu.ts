import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_API_KEY as string);

type Payload = {
  name: string;
  species: string;
};
export const sendEmail = async (email: string, payload: Payload) => {
  if (!email) throw new Error("No email");

  novu.trigger("<TRIGGER_ID>", {
    to: {
      subscriberId: email,
      email,
    },
    payload: {
      name: payload.name,
      species: payload.species,
    },
  });
};
