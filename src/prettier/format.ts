import { Message } from "./prettier-worker-message";

let prettierWorker: Worker;

export function format(code: string) {
  if (!prettierWorker) {
    prettierWorker = new Worker(
      new URL("./prettier-worker.ts", import.meta.url)
    );
  }

  const message: Message = { code };

  prettierWorker.postMessage(message);
}
