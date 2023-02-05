import { Character } from "@/generated/graphql";
import { FormEvent, useState } from "react";

type Props = {
  characters: (Character | null)[] | null | undefined;
};

const EmailForm: React.FC<Props> = ({ characters }) => {
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (characters && characters?.length > 0) {
      // Get random character from the array.
      const random = Math.floor(Math.random() * (characters.length - 1));
      const randomCharacter = characters[random];

      console.log("email: ", email);
      console.log("name: ", randomCharacter?.name);
      console.log("species: ", randomCharacter?.species);

      // Make send email request to /api/send-email
      fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          email,
          name: randomCharacter?.name,
          species: randomCharacter?.species,
        }),
      });
    }
  };

  return (
    <div>
      <p>Send me random character 🚀</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send!</button>
      </form>
    </div>
  );
};

export default EmailForm;
