import axios from 'axios';
import {toast} from 'react-toastify';

//const baseurl='https://stage-master.api.infoss.solusisentraldata.com/';
const baseurl = 'https://localhost:7277/';

const defaultPosition = toast.POSITION.TOP_RIGHT;

export const showToast = (
  type = 'success',
  msg,
  autoClose = 2000,
  className = 'primaryColor',
  position = defaultPosition
) => {
  if (type === 'success') {
    toast.success(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? 'primaryColor' : className,
      position: position,
    });
  } else if (type === 'error') {
    toast.error(msg, {
      autoClose: autoClose === null ? 2000 : autoClose,
      className: className === null ? 'dangerColor' : className,
      position: position,
    });
  }
};

class ApiService {
  getAll(param) {
    return axios.get(baseurl + param);
  }

  getAllWithPaging(param) {
    //alert("getAllWithPaging");
    //showToast('success', 'Product add to cart successfully !');

    return axios.get(baseurl + param + '1/20000');
  }

  getDataById(param, Id) {
    //showToast('success', 'Product add to cart successfully !');
    return axios.get(baseurl + param + Id);
  }

  createData(param, Data) {
    return axios.post(baseurl + param, Data);
  }

  updateData(param, Data) {
    return axios.put(baseurl + param, Data);
  }

  deleteData(param, Id) {
    let username = 'wahyu';
    return axios.delete(baseurl + param + Id + '/' + username);
  }
}

export default new ApiService();
