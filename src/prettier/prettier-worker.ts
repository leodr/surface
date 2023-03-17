import markdownParser from "prettier/parser-markdown";
import prettier from "prettier/standalone";
import { Message } from "./prettier-worker-message";

onmessage = (message) => {
  const parsedMessage = message as unknown as Message;

  prettier.format(parsedMessage.code, {
    parser: "markdown",
    plugins: [markdownParser],
  });
};
