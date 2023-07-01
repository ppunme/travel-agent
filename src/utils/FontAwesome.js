import { library } from "@fortawesome/fontawesome-svg-core";

const {
  faFacebook,
  faSquareFacebook,
  faInstagram,
  faTwitter,
  faLine,
  faFacebookMessenger,
} = await import("@fortawesome/free-brands-svg-icons");

const {
  faMagnifyingGlass,
  faCircleXmark: solidCircleXmark,
  faLocationDot,
  faClock,
  faPlane,
  faBus,
  faPhone,
  faEnvelope,
  faPlus,
  faPen,
  faTrash,
  faChevronUp,
  faChevronDown,
  faChevronCircleUp,
  faChevronCircleDown,
  faTimes,
  faCheck,
  faXmark,
  faLock,
  faBars,
  faExclamationCircle,
  faSignOutAlt,
  faSignOut,
} = await import("@fortawesome/free-solid-svg-icons");

const { faCircleXmark: regularCircleXmark, faUser } = await import(
  "@fortawesome/free-regular-svg-icons"
);

library.add(
  faFacebook,
  faSquareFacebook,
  faBus,
  faPhone,
  faEnvelope,
  faLine,
  faInstagram,
  faTwitter,
  faMagnifyingGlass,
  faFacebookMessenger,
  solidCircleXmark,
  faLocationDot,
  faClock,
  faPlane,
  faPlus,
  faPen,
  faTrash,
  faChevronUp,
  faChevronDown,
  faChevronCircleUp,
  faChevronCircleDown,
  faTimes,
  regularCircleXmark,
  faCheck,
  faXmark,
  faBars,
  faExclamationCircle,
  faLock,
  faUser,
  faSignOutAlt,
  faSignOut
);
