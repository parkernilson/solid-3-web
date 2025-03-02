import emojiRegex from "emoji-regex";
const regex = emojiRegex();

export const isOneEmoji = (str: string) => {
    const matches = str.match(regex)
    return matches !== null && matches.length === 1 && matches[0] === str;
}