import VueGtag, { event } from "vue-gtag";

const gtag = VueGtag;

const gconfig = {
  config: {
    id: process.env.VUE_APP_GA_MEASUREMENT_ID,
  },
};

const line = (page) => {
  event(`Line button - ${page}`, {
    event_category: "Contact",
    event_label: `Line button clicked through ${page} page`,
  });
};

const messenger = (page) => {
  event(`Messenger button - ${page}`, {
    event_category: "Contact",
    event_label: `Messenger button clicked through ${page} page`,
  });
};

const phone = (page) => {
  event(`Phone button - ${page}`, {
    event_category: "Contact",
    event_label: `Phone button clicked through ${page} page`,
  });
};

const email = (page) => {
  event(`Email button - ${page}`, {
    event_category: "Contact",
    event_label: `Email button clicked through ${page} page`,
  });
};

const facebook = (page) => {
  event(`Facebook button - ${page}`, {
    event_category: "Social Media",
    event_label: `Facebook button clicked through ${page} page`,
  });
};

const instagram = (page) => {
  event(`Instagram button - ${page}`, {
    event_category: "Social Media",
    event_label: `Instagram button clicked through ${page} page`,
  });
};

export { gtag, gconfig, line, messenger, phone, email, facebook, instagram };
