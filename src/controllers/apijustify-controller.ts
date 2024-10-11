import { Request, Response } from "express";

export const justifyText = (text: string, lineLength: number = 80): string => {
  if (typeof text !== "string") {
    throw new Error("Invalid input, expected a string");
  }

  const words = text.split(" ");
  let lines: string[] = [];
  let currentLine: string[] = [];

  for (const word of words) {
    if (
      currentLine.join(" ").length + word.length + currentLine.length >
      lineLength
    ) {
      const justifiedLine = justifyLine(currentLine, lineLength);
      lines.push(justifiedLine);
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }
  return lines.join("\n");
};

const justifyLine = (words: string[], lineLength: number): string => {
  if (words.length === 1) return words[0];

  const totalChars = words.reduce((sum, word) => sum + word.length, 0);
  const totalSpaces = lineLength - totalChars;
  const spaceBetweenWords = Math.floor(totalSpaces / (words.length - 1));
  const extraSpaces = totalSpaces % (words.length - 1);

  return words.reduce((justifiedLine, word, index) => {
    justifiedLine += word;

    if (index < words.length - 1) {
      justifiedLine += " ".repeat(spaceBetweenWords);

      if (index < extraSpaces) {
        justifiedLine += " ";
      }
    }

    return justifiedLine;
  }, "");
};

export const justifyTextHandler = (req: Request, res: Response): any => {
  //console.log("Request body:", req.body); // Add this line
  const { body, query } = req;
  console.log("Request body:", req.body); // Add this line

  const { size }: { size?: number } = query;

  if (typeof body !== "string" || !body) {
    return res.status(400).json({ error: "Missing text" });
  }

  const justifiedText = justifyText(body, size || 80);
  return res.status(200).type("text/plain").send(justifiedText);
};
