import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type toastProps = {
  title: String;
};

const settings = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  borderRadius: 6,
};

export const infoToast = ({ title }: toastProps) => {
  toast.info(title, { ...settings });
};

export const successToast = ({ title }: toastProps) => {
  toast.success(title, { ...settings });
};

export const warningToast = ({ title }: toastProps) => {
  toast.warn(title, { ...settings });
};

export const errorToast = ({ title }: toastProps) => {
  toast.error(title.toString(), { ...settings });
};

export const defaultToast = ({ title }: toastProps) => {
  toast(title, { ...settings });
};
