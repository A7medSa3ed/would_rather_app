function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
export function formatDate(timestamp) {
  const d = new Date(timestamp);
  return " | " + d.toLocaleDateString();
}

export function formatUser(userName) {
  return {
    id: userName.replace(/\s/g, ""),
    name: userName,
    avatarURL: "/images/defaultUser.png",
    answers: {},
    questions: [],
  };
}
export function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}
