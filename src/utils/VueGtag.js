import VueGtag, { event } from "vue-gtag";

const Gtag = [
  [
    VueGtag,
    {
      config: {
        id: "G-91E35BY8YQ",
      },
    },
  ],
];

const line = (page) => {
  event("LineButtonClick", {
    event_category: "Contact",
    event_label: `Line button clicked through ${page} page`,
  });
};

const messenger = (page) => {
  event("MessengerButtonClick", {
    event_category: "Contact",
    event_label: `Messenger button clicked through ${page} page`,
  });
};

const phone = (page) => {
  event("PhoneButtonClick", {
    event_category: "Contact",
    event_label: `Phone button clicked through ${page} page`,
  });
};

const email = (page) => {
  event("EmailButtonClick", {
    event_category: "Contact",
    event_label: `Email button clicked through ${page} page`,
  });
};

const facebook = (page) => {
  event("FacebookButtonClick", {
    event_category: "Social Media",
    event_label: `Facebook button clicked through ${page} page`,
  });
};

const instagram = (page) => {
  event("InstagramButtonClick", {
    event_category: "Social Media",
    event_label: `Instagram button clicked through ${page} page`,
  });
};

export { Gtag, line, messenger, phone, email, facebook, instagram };
