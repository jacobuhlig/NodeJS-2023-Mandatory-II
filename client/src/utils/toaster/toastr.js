import toastr from "toastr";
import 'toastr/build/toastr.css';
import "./toastr.css";

export function toastrSetup() {
  toastr.options = {
        "positionClass": "toast-top-right",
        "timeOut": 2500,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "containerId": "toast-container"
  }
}

export default toastr;