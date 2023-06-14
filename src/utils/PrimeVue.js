import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import Chip from "primevue/chip";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/dialog";
import DialogService from "primevue/dialogservice";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import Menu from "primevue/menu";
import MultiSelect from "primevue/multiselect";
import Paginator from "primevue/paginator";
import Password from "primevue/password";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

export const usePrimeVue = [ConfirmationService, ToastService, DialogService];

export const componentPrimeVue = [
  ["Avatar", Avatar],
  ["Button", Button],
  ["Carousel", Carousel],
  ["Chip", Chip],
  ["ConfirmDialog", ConfirmDialog],
  ["Dialog", Dialog],
  ["Dropdown", Dropdown],
  ["Editor", Editor],
  ["FileUpload", FileUpload],
  ["InputText", InputText],
  ["InputMask", InputMask],
  ["InputNumber", InputNumber],
  ["Menu", Menu],
  ["MultiSelect", MultiSelect],
  ["Paginator", Paginator],
  ["Password", Password],
  ["Skeleton", Skeleton],
  ["Toast", Toast],
];
