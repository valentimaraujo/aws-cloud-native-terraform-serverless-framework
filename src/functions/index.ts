import { userRegister, userLogin, userAuthorizer } from "@functions/user";
import { bookingCreate, bookingFetchAll } from "@functions/booking";

const functions = {
    userRegister,
    userLogin,
    userAuthorizer,

    bookingCreate,
    bookingFetchAll
}
export default functions;
