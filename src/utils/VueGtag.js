const gconfig = {
  config: {
    id: process.env.VUE_APP_GA_MEASUREMENT_ID,
  },
};

const line = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Line button - ${page}`, {
      event_category: "Contact",
      event_label: `Line button clicked through ${page} page`,
    });
  });

const messenger = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Messenger button - ${page}`, {
      event_category: "Contact",
      event_label: `Messenger button clicked through ${page} page`,
    });
  });

const phone = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Phone button - ${page}`, {
      event_category: "Contact",
      event_label: `Phone button clicked through ${page} page`,
    });
  });

const email = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Email button - ${page}`, {
      event_category: "Contact",
      event_label: `Email button clicked through ${page} page`,
    });
  });

const facebook = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Facebook button - ${page}`, {
      event_category: "Social Media",
      event_label: `Facebook button clicked through ${page} page`,
    });
  });

const instagram = (page) =>
  import("vue-gtag").then(({ event }) => {
    event(`Instagram button - ${page}`, {
      event_category: "Social Media",
      event_label: `Instagram button clicked through ${page} page`,
    });
  });

export { gconfig, line, messenger, phone, email, facebook, instagram };
