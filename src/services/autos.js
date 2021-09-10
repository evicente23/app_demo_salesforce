import axios from 'axios';

const PREFIJO = 'https://personaliza.kiaecuador.com.ec/api/ApcMdCmr/';

export default {
  lista() {
    const dto = {
      bdt1: true,
      dt19: 'PERSONALIZA',
      idTrack: 5,
    };
    return axios.post(`${PREFIJO}VmSlAmd`, dto);
  },
};
