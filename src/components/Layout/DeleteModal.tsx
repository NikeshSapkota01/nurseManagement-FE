import Swal from "sweetalert2";

interface DeleteInterface {
  title?: string;
  text?: string;
  confirmHandler: () => void;
  refreshHandler?: (arg: boolean) => void;
}

const DeleteModal = ({
  title,
  text,
  confirmHandler,
  refreshHandler,
}: DeleteInterface) => {
  Swal.fire({
    title: title ? title : "Are you sure you want to delete?",
    text: text ? text : "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#142E71",
    cancelButtonColor: "#CE3131",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmHandler();
    }
  });
};

export default DeleteModal;
